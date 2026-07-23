/**
 * Fixed, pointer-events-none ambient light layer behind all page content —
 * keeps the dark navy background from reading as flat/dead. Stays put while
 * the page scrolls (never attached to a scrolling container, per our
 * performance rules for ambient background motion).
 */
export function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.42 0.07 255 / 55%), transparent 72%)",
        }}
      />
      <div
        className="absolute left-[-15%] top-[45%] h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.55 0.09 78 / 35%), transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[10%] h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.4 0.07 255 / 45%), transparent 72%)",
        }}
      />
    </div>
  );
}
