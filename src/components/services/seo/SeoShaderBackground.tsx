"use client";

import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const VERTEX_SHADER = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_pointerPresence;

float hash21(vec2 point) {
  point = fract(point * vec2(234.34, 435.345));
  point += dot(point, point + 34.23);
  return fract(point.x * point.y);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  vec2 curve = local * local * (3.0 - 2.0 * local);

  return mix(
    mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), curve.x),
    mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + vec2(1.0, 1.0)), curve.x),
    curve.y
  );
}

float fbm(vec2 point) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int index = 0; index < 5; index++) {
    value += amplitude * noise(point);
    point = point * 2.03 + vec2(17.0, 9.2);
    amplitude *= 0.5;
  }

  return value;
}

vec3 fieldColour(vec2 point, float time) {
  vec3 deep = vec3(0.012, 0.055, 0.082);
  vec3 blue = vec3(0.055, 0.255, 0.425);
  vec3 cyan = vec3(0.325, 0.755, 0.895);
  vec3 ice = vec3(0.82, 0.93, 0.98);

  vec2 first = vec2(sin(time * 0.17), cos(time * 0.13)) * 0.55;
  vec2 second = vec2(cos(time * 0.11 + 1.8), sin(time * 0.19 + 0.8)) * 0.7;
  vec2 third = vec2(sin(time * 0.09 + 3.4), cos(time * 0.15 + 2.2)) * 0.62;

  float a = exp(-dot(point - first, point - first) * 3.8);
  float b = exp(-dot(point - second, point - second) * 4.8);
  float c = exp(-dot(point - third, point - third) * 6.5);
  float total = 0.28 + a + b + c;

  return (deep * 0.28 + blue * a + cyan * b + ice * c) / total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 point = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);

  vec2 pointer = (0.5 * u_pointer * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  vec2 delta = point - pointer;
  float distanceToPointer = length(delta);
  float pointerMask = u_pointerPresence
    * (1.0 - smoothstep(0.0, 0.42, distanceToPointer));
  float pointerAngle = pointerMask * 1.15;
  float cosine = cos(pointerAngle);
  float sine = sin(pointerAngle);
  point = pointer + mat2(cosine, -sine, sine, cosine) * delta;

  point *= 1.26;
  point += 0.17 * (vec2(
    fbm(point * 2.05 + u_time * 0.025),
    fbm(point * 2.05 + vec2(5.2, 1.3) - u_time * 0.018)
  ) - 0.5);

  vec3 colour = fieldColour(point, u_time);
  float luma = dot(colour, vec3(0.299, 0.587, 0.114));
  colour = mix(vec3(luma), colour, 0.86);
  colour = (colour - 0.5) * 1.1 + 0.5;
  colour *= 0.42;

  float vignette = length(uv - 0.5) * 1.414;
  colour *= 1.0 - 0.56 * smoothstep(0.28, 1.0, vignette);
  colour += pointerMask * vec3(0.012, 0.06, 0.075);

  float grain = hash21(gl_FragCoord.xy + vec2(17.0, 31.0)) - 0.5;
  colour += grain * 0.025;

  gl_FragColor = vec4(clamp(colour, 0.0, 1.0), 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function SeoShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useSafeReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER,
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const pointer = gl.getUniformLocation(program, "u_pointer");
    const pointerPresence = gl.getUniformLocation(program, "u_pointerPresence");

    let bounds = canvas.getBoundingClientRect();
    let targetX = 0;
    let targetY = 0;
    let targetPresence = 0;
    let pointerX = 0;
    let pointerY = 0;
    let presence = 0;
    let frame = 0;
    let previousTime = performance.now();
    let inView = true;
    let pageVisible = document.visibilityState === "visible";
    let disposed = false;

    const resize = () => {
      bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const rawWidth = Math.max(1, Math.round(bounds.width * dpr));
      const rawHeight = Math.max(1, Math.round(bounds.height * dpr));
      const scale = Math.min(
        1,
        Math.sqrt(1_800_000 / Math.max(1, rawWidth * rawHeight)),
      );
      const width = Math.max(1, Math.round(rawWidth * scale));
      const height = Math.max(1, Math.round(rawHeight * scale));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const requestRender = () => {
      if (!disposed && inView && pageVisible && frame === 0) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || bounds.width === 0 || bounds.height === 0) return;
      targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      targetY = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      targetPresence = 1;
      requestRender();
    };

    const handlePointerLeave = () => {
      targetPresence = 0;
      requestRender();
    };

    function render(now: number) {
      frame = 0;
      if (disposed || !inView || !pageVisible) return;
      if (!gl || !canvas) return;

      const delta = Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      const follow = 1 - Math.exp(-10 * delta);
      pointerX += (targetX - pointerX) * follow;
      pointerY += (targetY - pointerY) * follow;
      presence += (targetPresence - presence) * follow;

      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, reducedMotion ? 2.6 : now / 1000);
      gl.uniform2f(pointer, pointerX, pointerY);
      gl.uniform1f(pointerPresence, reducedMotion ? 0 : presence);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      const pointerSettling =
        Math.abs(targetX - pointerX) > 0.001 ||
        Math.abs(targetY - pointerY) > 0.001 ||
        Math.abs(targetPresence - presence) > 0.001;
      if (!reducedMotion || pointerSettling) requestRender();
    }

    resize();
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      requestRender();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView) requestRender();
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    intersectionObserver.observe(canvas);

    const handleVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) requestRender();
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    requestRender();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
