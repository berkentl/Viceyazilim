const HALF_TURN_S = 1.1;
const HOLD_S = 1.0;
const CYCLE_ACTIVE_S = HALF_TURN_S * 2 + HOLD_S;
const REPEAT_DELAY_S = 4;
const ROTATE_EASE = [0.65, 0, 0.35, 1] as const;

export const ROTATE_KEYFRAMES = [0, 180, 180, 360];

/**
 * Slow, periodic 180°->360° turn for persistent brand-mark instances. Both
 * 180° halves run at the identical speed (equal share of CYCLE_ACTIVE_S) —
 * a naive [0,180,180,360] keyframe list with mismatched `times` made the
 * second half spin noticeably faster than the first.
 */
export function rotateTransition(delay: number) {
  return {
    duration: CYCLE_ACTIVE_S,
    times: [
      0,
      HALF_TURN_S / CYCLE_ACTIVE_S,
      (HALF_TURN_S + HOLD_S) / CYCLE_ACTIVE_S,
      1,
    ],
    ease: ROTATE_EASE,
    repeat: Infinity,
    repeatDelay: REPEAT_DELAY_S,
    delay,
  };
}
