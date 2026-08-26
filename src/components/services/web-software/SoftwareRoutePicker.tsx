"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CaretDown, Lightning, X } from "@phosphor-icons/react";
import styles from "./SoftwareRoutePicker.module.css";

const PINBALL_DEFAULTS = Object.freeze({
  ballRadius: 8,
  gravity: 680,
  pegRestitution: 0.76,
  wallRestitution: 0.7,
  tangentRetention: 0.985,
  pocketRestitution: 0.3,
  pocketSpring: 150,
  pocketDamping: 18,
  fixedStep: 1 / 240,
  maxPlayTime: 3.5,
});

const STOPS = [
  { id: "auto", label: "Otomatik" },
  { id: "light", label: "Hafif" },
  { id: "medium", label: "Orta" },
  { id: "high", label: "Yüksek" },
  { id: "extra-high", label: "Çok Yüksek" },
  { id: "ultra", label: "Ultra" },
] as const;

const STOP_POSITIONS = [8.333, 25, 41.667, 58.333, 75, 91.667];
const INITIAL_STOP = 2;
const PEG_ROWS = [5, 6, 5, 6, 5];
const PEG_POSITIONS = PEG_ROWS.flatMap((count, rowIndex) => {
  const positions =
    count === 5
      ? [16.667, 33.333, 50, 66.667, 83.333]
      : [8.333, 25, 41.667, 58.333, 75, 91.667];

  return positions.map((left) => ({ left, top: 10 + rowIndex * 18 }));
});

type Peg = {
  element: HTMLSpanElement;
  x: number;
  y: number;
  radius: number;
};

type Impact = {
  peg: Peg;
  index: number;
  x: number;
  y: number;
  nx: number;
  ny: number;
  speed: number;
};

type PinballState = Omit<typeof PINBALL_DEFAULTS, "ballRadius"> & {
  ballRadius: number;
  width: number;
  height: number;
  pocketTop: number;
  pegs: Peg[];
  x: number;
  y: number;
  vx: number;
  vy: number;
  elapsed: number;
  captureElapsed: number;
  accumulator: number;
  mode: "play" | "pocket";
  target: number | null;
  targetX: number | null;
  targetY: number;
  floorHits: number;
  verticalSleeping: boolean;
  landed: boolean;
  lastImpactAt: number[];
};

type TracePoint = { x: number; y: number; time: number };

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function createPinballState({
  width,
  height,
  pocketTop,
  pegs,
  ballRadius,
}: {
  width: number;
  height: number;
  pocketTop: number;
  pegs: Peg[];
  ballRadius: number;
}): PinballState {
  const jitter = (Math.random() - 0.5) * 4.4;
  const launchSample = Math.random() - 0.5;
  const launchVelocity =
    Math.sign(launchSample || 1) * (16 + Math.abs(launchSample) * 28);

  return {
    ...PINBALL_DEFAULTS,
    ballRadius,
    width,
    height,
    pocketTop,
    pegs,
    x: width / 2 + jitter,
    y: -PINBALL_DEFAULTS.ballRadius,
    vx: launchVelocity,
    vy: 30,
    elapsed: 0,
    captureElapsed: 0,
    accumulator: 0,
    mode: "play",
    target: null,
    targetX: null,
    targetY: height * 0.89,
    floorHits: 0,
    verticalSleeping: false,
    landed: false,
    lastImpactAt: Array(pegs.length).fill(-Infinity),
  };
}

function resolveSideWalls(state: PinballState) {
  if (state.x < state.ballRadius) {
    state.x = state.ballRadius;
    if (state.vx < 0) state.vx *= -state.wallRestitution;
  } else if (state.x > state.width - state.ballRadius) {
    state.x = state.width - state.ballRadius;
    if (state.vx > 0) state.vx *= -state.wallRestitution;
  }
}

function resolvePegs(state: PinballState, impacts: Impact[]) {
  for (let pass = 0; pass < 2; pass += 1) {
    state.pegs.forEach((peg, index) => {
      const dx = state.x - peg.x;
      const dy = state.y - peg.y;
      const minimumDistance = state.ballRadius + peg.radius;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared >= minimumDistance * minimumDistance) return;

      const distance = Math.sqrt(distanceSquared) || minimumDistance;
      const nx = distanceSquared === 0 ? 0 : dx / distance;
      const ny = distanceSquared === 0 ? -1 : dy / distance;
      const overlap = minimumDistance - distance;
      state.x += nx * overlap;
      state.y += ny * overlap;

      const normalVelocity = state.vx * nx + state.vy * ny;
      if (normalVelocity >= 0) return;

      const tangentX = -ny;
      const tangentY = nx;
      const tangentVelocity = state.vx * tangentX + state.vy * tangentY;
      const reboundVelocity = -normalVelocity * state.pegRestitution;
      const retainedTangentVelocity =
        tangentVelocity * state.tangentRetention;
      state.vx =
        reboundVelocity * nx + retainedTangentVelocity * tangentX;
      state.vy =
        reboundVelocity * ny + retainedTangentVelocity * tangentY;

      if (
        state.elapsed - state.lastImpactAt[index] >= 0.075 &&
        -normalVelocity >= 24
      ) {
        state.lastImpactAt[index] = state.elapsed;
        impacts.push({
          peg,
          index,
          x: peg.x + nx * peg.radius,
          y: peg.y + ny * peg.radius,
          nx,
          ny,
          speed: -normalVelocity,
        });
      }
    });
  }
}

function beginPocketCapture(state: PinballState) {
  const slotWidth = state.width / STOPS.length;
  const target = clamp(Math.floor(state.x / slotWidth), 0, STOPS.length - 1);
  state.target = target;
  state.targetX = (target + 0.5) * slotWidth;
  state.mode = "pocket";
}

function stepPinball(state: PinballState, deltaSeconds: number) {
  if (state.landed) return { landed: true, impacts: [] as Impact[] };

  state.elapsed += deltaSeconds;
  const impacts: Impact[] = [];

  if (state.mode === "play") {
    state.vy += state.gravity * deltaSeconds;
    state.x += state.vx * deltaSeconds;
    state.y += state.vy * deltaSeconds;
    resolveSideWalls(state);
    resolvePegs(state, impacts);

    if (state.y >= state.pocketTop || state.elapsed >= state.maxPlayTime) {
      beginPocketCapture(state);
    }
  } else if (state.targetX !== null && state.target !== null) {
    state.captureElapsed += deltaSeconds;
    const horizontalAcceleration =
      (state.targetX - state.x) * state.pocketSpring -
      state.vx * state.pocketDamping;
    state.vx += horizontalAcceleration * deltaSeconds;
    state.x += state.vx * deltaSeconds;

    const slotWidth = state.width / STOPS.length;
    const left = state.target * slotWidth + state.ballRadius;
    const right = (state.target + 1) * slotWidth - state.ballRadius;

    if (state.x < left) {
      state.x = left;
      if (state.vx < 0) state.vx *= -state.wallRestitution;
    } else if (state.x > right) {
      state.x = right;
      if (state.vx > 0) state.vx *= -state.wallRestitution;
    }

    if (!state.verticalSleeping) {
      state.vy += state.gravity * deltaSeconds;
      state.y += state.vy * deltaSeconds;

      if (state.y >= state.targetY && state.vy > 0) {
        const incomingSpeed = state.vy;
        state.y = state.targetY;
        state.vy = -incomingSpeed * state.pocketRestitution;
        state.vx *= 0.82;
        state.floorHits += 1;

        if (state.floorHits >= 2 || incomingSpeed < 90) {
          state.vy = 0;
          state.verticalSleeping = true;
        }
      }
    }

    const horizontallySettled =
      Math.abs(state.targetX - state.x) < 0.7 && Math.abs(state.vx) < 7;
    if (
      (state.verticalSleeping && horizontallySettled) ||
      state.captureElapsed >= 0.9
    ) {
      state.x = state.targetX;
      state.y = state.targetY;
      state.vx = 0;
      state.vy = 0;
      state.landed = true;
    }
  }

  return { landed: state.landed, impacts };
}

function randomReducedMotionStop() {
  let rights = 0;
  for (let index = 0; index < 5; index += 1) {
    if (Math.random() >= 0.5) rights += 1;
  }
  return rights;
}

export function SoftwareRoutePicker({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(INITIAL_STOP);
  const [phase, setPhase] = useState<"dropping" | "landed">("landed");
  const [landingSlot, setLandingSlot] = useState<number | null>(null);

  const fieldRef = useRef<HTMLDivElement>(null);
  const pocketsRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLSpanElement>(null);
  const impactRef = useRef<HTMLSpanElement>(null);
  const flightPathRef = useRef<SVGSVGElement>(null);
  const flightPathGlowRef = useRef<SVGPathElement>(null);
  const flightPathCoreRef = useRef<SVGPathElement>(null);
  const pegRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const animationFrameRef = useRef(0);
  const animationTokenRef = useRef(0);
  const landingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setBall = useCallback((x: number, y: number, scale = 1) => {
    const ball = ballRef.current;
    if (!ball) return;
    ball.style.setProperty("--ball-x", `${x}%`);
    ball.style.setProperty("--ball-y", `${y}%`);
    ball.style.setProperty("--ball-scale", String(scale));
  }, []);

  const clearFlightPath = useCallback(() => {
    flightPathRef.current?.classList.remove(styles.flightPathVisible);
    flightPathGlowRef.current?.setAttribute("d", "");
    flightPathCoreRef.current?.setAttribute("d", "");
  }, []);

  const cancelAnimation = useCallback(() => {
    animationTokenRef.current += 1;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }
    if (landingTimerRef.current) {
      clearTimeout(landingTimerRef.current);
      landingTimerRef.current = null;
    }
    if (trailRef.current) trailRef.current.style.opacity = "0";
    clearFlightPath();
    setLandingSlot(null);
  }, [clearFlightPath]);

  const flashImpact = useCallback(
    (state: PinballState, impact: Impact) => {
      const marker = impactRef.current;
      if (marker) {
        const x = (impact.x / state.width) * 100;
        const y = (impact.y / state.height) * 100;
        const rotation = (Math.atan2(impact.ny, impact.nx) * 180) / Math.PI;
        marker.style.setProperty("--impact-x", `${x}%`);
        marker.style.setProperty("--impact-y", `${y}%`);
        marker.style.setProperty("--impact-rotation", `${rotation}deg`);
        marker.classList.remove(styles.impactFlash);
        void marker.offsetWidth;
        marker.classList.add(styles.impactFlash);
      }

      const peg = impact.peg.element;
      const kick = Math.min(1.45, 0.65 + impact.speed / 260);
      peg.style.setProperty(
        "--peg-kick-x",
        `${(-impact.nx * kick).toFixed(2)}px`,
      );
      peg.style.setProperty(
        "--peg-kick-y",
        `${(-impact.ny * kick).toFixed(2)}px`,
      );
      peg.classList.remove(styles.pegRebound);
      void peg.offsetWidth;
      peg.classList.add(styles.pegRebound);
    },
    [],
  );

  const finishDrop = useCallback(
    (target: number, token: number) => {
      if (token !== animationTokenRef.current) return;
      const position = STOP_POSITIONS[target];
      setBall(position, 89, 1.04);
      setSelected(target);
      setPhase("landed");
      setLandingSlot(target);
      clearFlightPath();
      if (trailRef.current) trailRef.current.style.opacity = "0";

      landingTimerRef.current = setTimeout(() => {
        if (token !== animationTokenRef.current) return;
        setLandingSlot(null);
        landingTimerRef.current = null;
      }, 520);
    },
    [clearFlightPath, setBall],
  );

  const startDrop = useCallback(() => {
    if (phase === "dropping") return;

    cancelAnimation();
    setOpen(true);
    setPhase("dropping");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const token = ++animationTokenRef.current;

    if (reducedMotion) {
      finishDrop(randomReducedMotionStop(), token);
      return;
    }

    requestAnimationFrame(() => {
      const field = fieldRef.current;
      const pockets = pocketsRef.current;
      const ball = ballRef.current;
      if (!field || !pockets || !ball) return;

      const fieldRect = field.getBoundingClientRect();
      const pocketRect = pockets.getBoundingClientRect();
      const ballRect = ball.getBoundingClientRect();
      const pegs = pegRefs.current.flatMap((element) => {
        if (!element) return [];
        const rect = element.getBoundingClientRect();
        return [
          {
            element,
            x: rect.left + rect.width / 2 - fieldRect.left,
            y: rect.top + rect.height / 2 - fieldRect.top,
            radius: rect.width / 2,
          },
        ];
      });

      const motion = createPinballState({
        width: fieldRect.width,
        height: fieldRect.height,
        pocketTop: pocketRect.top - fieldRect.top,
        pegs,
        ballRadius: ballRect.width / 2,
      });

      const trace: TracePoint[] = [];
      const history: TracePoint[] = [];
      let lastFrame: number | null = null;

      flightPathRef.current?.setAttribute(
        "viewBox",
        `0 0 ${motion.width} ${motion.height}`,
      );
      flightPathRef.current?.classList.add(styles.flightPathVisible);
      setBall((motion.x / motion.width) * 100, (motion.y / motion.height) * 100);

      const appendTracePoint = (
        x: number,
        y: number,
        time: number,
        minimumDistance = 1.35,
      ) => {
        const last = trace.at(-1);
        if (!last || Math.hypot(x - last.x, y - last.y) >= minimumDistance) {
          trace.push({ x, y, time });
        }
      };

      const frame = (now: number) => {
        if (token !== animationTokenRef.current) return;
        if (lastFrame === null) lastFrame = now;
        const deltaSeconds = Math.max(
          0,
          Math.min(0.05, (now - lastFrame) / 1000),
        );
        lastFrame = now;
        motion.accumulator = Math.min(
          0.08,
          motion.accumulator + deltaSeconds,
        );
        let landed = false;

        while (motion.accumulator >= motion.fixedStep && !landed) {
          const events = stepPinball(motion, motion.fixedStep);
          events.impacts.forEach((impact) => {
            appendTracePoint(impact.x, impact.y, now, 0.5);
            flashImpact(motion, impact);
          });
          landed = events.landed;
          motion.accumulator -= motion.fixedStep;
        }

        const x = (motion.x / motion.width) * 100;
        const y = (motion.y / motion.height) * 100;
        setBall(x, y);
        appendTracePoint(motion.x, motion.y, now);

        const cutoff = now - 90;
        while (trace.length > 2 && trace[1].time < cutoff) trace.shift();
        const path = trace
          .map(
            (point, index) =>
              `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
          )
          .join(" ");
        flightPathGlowRef.current?.setAttribute("d", path);
        flightPathCoreRef.current?.setAttribute("d", path);

        history.push({ time: now, x, y });
        const ghostTime = now - 72;
        while (history.length > 2 && history[1].time <= ghostTime) {
          history.shift();
        }
        const ghost = history[0];
        const trail = trailRef.current;
        if (ghost && trail) {
          const angle = (Math.atan2(motion.vy, motion.vx) * 180) / Math.PI;
          const stretch =
            1 + Math.min(0.65, Math.hypot(motion.vx, motion.vy) / 390);
          trail.style.left = `${ghost.x}%`;
          trail.style.top = `${ghost.y}%`;
          trail.style.setProperty("--trail-angle", `${angle}deg`);
          trail.style.setProperty("--trail-stretch", stretch.toFixed(3));
          trail.style.opacity = history.length > 1 && !landed ? "0.34" : "0.05";
        }

        if (!landed) {
          animationFrameRef.current = requestAnimationFrame(frame);
        } else {
          animationFrameRef.current = 0;
          finishDrop(motion.target ?? INITIAL_STOP, token);
        }
      };

      animationFrameRef.current = requestAnimationFrame(frame);
    });
  }, [cancelAnimation, finishDrop, flashImpact, phase, setBall]);

  useEffect(() => {
    if (phase === "landed") setBall(STOP_POSITIONS[selected], 89);
  }, [phase, selected, setBall]);

  useEffect(() => cancelAnimation, [cancelAnimation]);

  const status =
    phase === "dropping"
      ? "Top oyunda..."
      : selected === STOPS.length - 1
        ? "En yüksek yapay zekâ eforu seçildi"
        : `${STOPS[selected].label} seviyeye indi. Efor ayarlandı.`;

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.shell}>
        <section
          className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
          role="dialog"
          aria-label="Yapay zekâ eforu"
          aria-hidden={!open}
          data-phase={phase}
          data-ultra={selected === STOPS.length - 1}
        >
          <header className={styles.header}>
            <div className={styles.copy}>
              <h3 className={styles.title}>Yapay zekâ eforu</h3>
              <p className={styles.status} aria-live="polite">
                {status}
              </p>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.again}
                type="button"
                onClick={startDrop}
                disabled={phase === "dropping"}
                aria-label="Yapay zekâ eforunu yeniden seç"
                aria-busy={phase === "dropping"}
              >
                <span className={styles.actionDot} aria-hidden="true" />
                <span className={styles.actionLabel}>
                  {phase === "dropping" ? "Seçiliyor" : "Tekrar"}
                </span>
                <Lightning
                  className={styles.bolt}
                  size={11}
                  weight="fill"
                  aria-hidden="true"
                />
              </button>
              <button
                className={styles.close}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Yapay zekâ eforu panelini kapat"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div ref={fieldRef} className={styles.fieldArea} aria-hidden="true">
            <div className={styles.pegBoard}>
              {PEG_POSITIONS.map((peg, index) => (
                <span
                  key={`${peg.left}-${peg.top}`}
                  ref={(element) => {
                    pegRefs.current[index] = element;
                  }}
                  className={styles.peg}
                  style={{ left: `${peg.left}%`, top: `${peg.top}%` }}
                />
              ))}
            </div>
            <svg
              ref={flightPathRef}
              className={styles.flightPath}
              preserveAspectRatio="none"
            >
              <path ref={flightPathGlowRef} className={styles.flightPathGlow} />
              <path ref={flightPathCoreRef} className={styles.flightPathCore} />
            </svg>
            <div ref={pocketsRef} className={styles.pockets}>
              {STOPS.map((stop, index) => (
                <span
                  key={stop.id}
                  className={`${styles.pocket} ${
                    selected === index ? styles.pocketActive : ""
                  }`}
                />
              ))}
            </div>
            <span className={styles.dropGate} />
            <span ref={trailRef} className={styles.trail} />
            <span ref={impactRef} className={styles.impact} />
            <span
              className={`${styles.landingGlow} ${
                landingSlot !== null ? styles.landingFire : ""
              }`}
              style={{
                "--burst-x": `${STOP_POSITIONS[landingSlot ?? selected]}%`,
              } as CSSProperties}
            />
            <span
              className={`${styles.landingBurst} ${
                landingSlot !== null ? styles.landingFire : ""
              }`}
              style={{
                "--burst-x": `${STOP_POSITIONS[landingSlot ?? selected]}%`,
              } as CSSProperties}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <i key={index} />
              ))}
            </span>
            <span
              ref={ballRef}
              className={`${styles.ball} ${
                landingSlot !== null ? styles.ballLanding : ""
              }`}
            />
          </div>

          <div className={styles.stopRow} aria-hidden="true">
            {STOPS.map((stop, index) => (
              <span
                key={stop.id}
                className={`${styles.stopLabel} ${
                  selected === index ? styles.stopLabelActive : ""
                }`}
              >
                {stop.id === "extra-high" ? (
                  <>
                    Çok
                    <br />
                    Yüksek
                  </>
                ) : (
                  stop.label
                )}
              </span>
            ))}
          </div>

          <div
            className={styles.slider}
            aria-hidden="true"
            style={{
              "--position": STOP_POSITIONS[selected],
            } as CSSProperties}
          >
            <div className={styles.rail}>
              <div className={styles.fill} />
              <div className={styles.railDots}>
                {STOP_POSITIONS.map((position) => (
                  <span
                    key={position}
                    className={styles.railDot}
                    style={{ left: `${position}%` }}
                  />
                ))}
              </div>
              <span className={styles.thumb} />
            </div>
          </div>
        </section>

        <button
          className={styles.trigger}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.triggerMain}>VICE AI</span>
          <span className={styles.triggerChoice}>
            {phase === "dropping" ? "Seçiliyor..." : STOPS[selected].label}
          </span>
          <CaretDown
            className={`${styles.triggerChevron} ${
              open ? styles.triggerChevronOpen : ""
            }`}
            size={10}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
