/**
 * A soft, neutral light behind a bulb: white fading to nothing at the circle's edge, which reads as
 * a faint glow on the #f5f5f5 media panel (and disappears on white). Place it first inside a
 * `relative isolate` wrapper that also holds the bulb, so it sits behind the dots without escaping
 * the wrapper's stacking context. Decorative, so hidden from assistive technology.
 */
export function BulbHalo({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-[46%] -z-10 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/.85),rgb(255_255_255/0))] ${className}`} />;
}
