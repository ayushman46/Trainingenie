"use client";

import { useEffect, useRef } from "react";
import { BULB_ASPECT, BULB_POINTS, BULB_RAYS } from "./bulb-points";

const PAD = 0.06; // horizontal padding as a fraction of width, each side

/** The bulb's colours: the outline dots and the rays as "r,g,b" strings, and the glass off and lit as [r, g, b]. */
export type BulbPalette = { ink: string; red: string; glassOff: number[]; glassOn: number[] };

/** The light palette, for white and the #f5f5f5 media panel: ink dots, bulb-red rays, grey glass that lights warm. */
export const BULB_LIGHT: BulbPalette = { ink: "17,17,17", red: "158,42,43", glassOff: [201, 201, 203], glassOn: [214, 104, 78] };
/** The dark palette, for the black night band: white dots, coral rays, dim glass that lights warm. */
export const BULB_DARK: BulbPalette = { ink: "255,255,255", red: "224,88,79", glassOff: [74, 74, 76], glassOn: [243, 150, 128] };
/** Former names, kept so existing callers work. They now point at the neutral palettes above. */
export const BULB_WARM = BULB_LIGHT;
export const BULB_NIGHT = BULB_DARK;

// Legacy tones, kept so existing callers of `tone` render as before.
const TONES = { light: BULB_LIGHT, dark: BULB_DARK } satisfies Record<string, BulbPalette>;
const IDLE_LIGHT = 0.35;

/** Height/width ratio of the drawing area, used to reserve space before the canvas paints. */
export const PARTICLE_BULB_RATIO = (1 - 2 * PAD) * BULB_ASPECT + 2 * PAD;

/**
 * The TraininGenie lightbulb as a field of dots sampled from the logo. When it first comes into view
 * the dots assemble (outline first, then the rays clockwise) and the bulb switches on with a soft
 * glow; the cursor pushes dots aside and pointing at the glass brightens it. About five seconds in,
 * the rays stop twinkling and the drawing settles and stops (WCAG 2.2.2); a pointer wakes it again.
 * Decorative, so hidden from assistive technology. Static under reduced motion, paused when
 * off-screen or in a hidden tab. In forced colours the outline takes the system text colour.
 *
 * `palette` (pass BULB_LIGHT or BULB_DARK, or another module-level constant, never an inline object,
 * so the effect does not restart every render) wins over the legacy `tone`.
 *
 * `intro={false}` skips the assembly, for a small secondary bulb that would otherwise be seen half
 * built (a scattered dot cloud) as it scrolls in: the bulb is drawn whole and still from the start, as
 * under reduced motion, and switches on (its light rising over 400ms) the first time it is on screen.
 * The pointer works as usual.
 */
export function ParticleBulb({ tone = "light", palette, intro = true, className = "" }: { tone?: keyof typeof TONES; palette?: BulbPalette; intro?: boolean; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrap || !canvas || !context) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const colors = palette ?? TONES[tone];
    const { red: RED, glassOn: GLASS_ON } = colors;
    // The outline and the unlit glass. In forced colours they take the wrapper's (system) text colour,
    // the glass at 40%, so the drawing shows on any high-contrast background; the rays stay red.
    let INK = colors.ink, GLASS_OFF = colors.glassOff, glassAlpha = 0.55;
    const readColors = () => {
      if (!forcedColors.matches) { INK = colors.ink; GLASS_OFF = colors.glassOff; glassAlpha = 0.55; return; }
      const text = (getComputedStyle(wrap).color.match(/[\d.]+/g) ?? ["0", "0", "0"]).slice(0, 3).map(Number);
      INK = text.join(","); GLASS_OFF = text; glassAlpha = 0.4;
    };
    readColors();

    const count = BULB_POINTS.length;
    const x = new Float32Array(count), y = new Float32Array(count);
    const vx = new Float32Array(count), vy = new Float32Array(count);
    const tx = new Float32Array(count), ty = new Float32Array(count);
    const release = new Float32Array(count);
    const part = Int8Array.from(BULB_POINTS, (point) => point[2]);

    let width = 0, height = 0, dpr = 1, dot = 1.4, radius = 80;
    let glassX = 0, glassY = 0, glassR = 1;
    let pointerX = -1e4, pointerY = -1e4, pointerActive = false;
    let light = 0, frame = 0, visible = false, assembled = reduceMotion || !intro, settled = reduceMotion || !intro, running = false;
    // The animation clock: the time the loop has actually run, advanced at most 34ms a frame, so the
    // assembly plays in full when the bulb is first seen and never jumps after a pause or a slow frame.
    // Without the intro it starts past the assembly and the rays' twinkle, as on a settled bulb.
    let clock = intro ? 0 : 5000, last = 0;
    // Without the intro (and with motion): drawn unlit until it is first on screen, then switched on.
    let unlit = !intro && !reduceMotion;

    // Release order: outline and glass from the top down, then each ray clockwise.
    BULB_POINTS.forEach(([, py, p], i) => { release[i] = p <= 0 ? py * 900 : 750 + p * 110 + py * 120; });

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width; height = rect.height;
      // Up to 3x for sharp dots on phones, but 2x for a large canvas (over 2.5 million device pixels).
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      if (width * height * dpr * dpr > 2.5e6) dpr = Math.min(dpr, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      const scale = width * (1 - 2 * PAD), left = width * PAD, top = (height - scale * BULB_ASPECT) / 2;
      dot = Math.max(0.9, width / 270); radius = width * 0.15;
      let sx = 0, sy = 0, n = 0;
      BULB_POINTS.forEach(([px, py, p], i) => {
        tx[i] = left + px * scale; ty[i] = top + py * scale;
        if (p === -1) { sx += tx[i]; sy += ty[i]; n++; }
      });
      glassX = sx / Math.max(n, 1); glassY = sy / Math.max(n, 1);
      glassR = 0;
      BULB_POINTS.forEach(([, , p], i) => { if (p === -1) glassR = Math.max(glassR, Math.hypot(tx[i] - glassX, ty[i] - glassY)); });
    };

    const scatter = () => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2, distance = width * (0.35 + Math.random() * 0.5);
        x[i] = tx[i] + Math.cos(angle) * distance; y[i] = ty[i] + Math.sin(angle) * distance * 0.6;
        vx[i] = 0; vy[i] = 0;
      }
    };

    const settle = () => { for (let i = 0; i < count; i++) { x[i] = tx[i]; y[i] = ty[i]; vx[i] = 0; vy[i] = 0; } };

    const draw = (time: number) => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      if (light > 0.01) {
        // A soft circle that always fades to nothing inside the canvas, so no edge ever shows.
        const reach = Math.min(glassR * 2.2, glassX, width - glassX, glassY, height - glassY);
        const glow = context.createRadialGradient(glassX, glassY, 0, glassX, glassY, reach);
        glow.addColorStop(0, `rgba(${RED},${0.12 * light})`);
        glow.addColorStop(0.55, `rgba(${RED},${0.04 * light})`);
        glow.addColorStop(1, `rgba(${RED},0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(glassX, glassY, reach, 0, Math.PI * 2);
        context.fill();
      }
      const fade = (i: number) => (assembled ? 1 : Math.min(1, Math.max(0, (clock - release[i]) / 500)));
      // Glass: one colour per frame, interpolated with the light level.
      const g = GLASS_OFF.map((c, k) => Math.round(c + (GLASS_ON[k] - c) * light)).join(",");
      context.fillStyle = `rgba(${g},${glassAlpha + (0.9 - glassAlpha) * light})`;
      context.beginPath();
      for (let i = 0; i < count; i++) if (part[i] === -1 && fade(i) > 0) { context.moveTo(x[i] + dot * 0.8, y[i]); context.arc(x[i], y[i], dot * 0.8 * fade(i), 0, Math.PI * 2); }
      context.fill();
      context.fillStyle = `rgb(${INK})`;
      context.beginPath();
      for (let i = 0; i < count; i++) if (part[i] === 0 && fade(i) > 0) { context.moveTo(x[i] + dot, y[i]); context.arc(x[i], y[i], dot * fade(i), 0, Math.PI * 2); }
      context.fill();
      // The rays twinkle while the bulb assembles, then fade to still between 3.5s and 5s.
      const sway = Math.min(1, Math.max(0, 1 - (clock - 3500) / 1500));
      for (let ray = 1; ray <= BULB_RAYS; ray++) {
        const twinkle = reduceMotion ? 1 : 0.86 + 0.14 * sway * Math.sin(time / 900 + ray * 1.7);
        context.fillStyle = `rgba(${RED},${(0.78 + 0.22 * light) * twinkle})`;
        context.beginPath();
        for (let i = 0; i < count; i++) if (part[i] === ray && fade(i) > 0) { context.moveTo(x[i] + dot, y[i]); context.arc(x[i], y[i], dot * fade(i), 0, Math.PI * 2); }
        context.fill();
      }
    };

    const step = (time: number) => {
      clock += last ? Math.min(time - last, 34) : 16;
      last = time;
      // Settled once assembled, untouched, past 5s, and every dot at rest on its target.
      let calm = assembled && !pointerActive && clock > 5000;
      for (let i = 0; i < count; i++) {
        if (!assembled && clock < release[i]) continue;
        let ax = (tx[i] - x[i]) * 0.055, ay = (ty[i] - y[i]) * 0.055;
        if (pointerActive) {
          const dx = x[i] - pointerX, dy = y[i] - pointerY, distance = Math.hypot(dx, dy);
          if (distance < radius && distance > 0.01) { const push = Math.pow(1 - distance / radius, 2) * 7; ax += (dx / distance) * push; ay += (dy / distance) * push; }
        }
        vx[i] = (vx[i] + ax) * 0.82; vy[i] = (vy[i] + ay) * 0.82;
        x[i] += vx[i]; y[i] += vy[i];
        if (calm && (Math.abs(vx[i]) >= 0.02 || Math.abs(vy[i]) >= 0.02 || Math.abs(x[i] - tx[i]) >= 0.05 || Math.abs(y[i] - ty[i]) >= 0.05)) calm = false;
      }
      if (!assembled && clock > 750 + BULB_RAYS * 110 + 1400) assembled = true;
      const overGlass = pointerActive && Math.hypot(pointerX - glassX, pointerY - glassY) < glassR * 1.05;
      const target = assembled || clock > 1300 ? (overGlass ? 1 : IDLE_LIGHT) : 0;
      light += (target - light) * 0.06;
      if (calm && Math.abs(target - light) < 0.005) {
        // At rest: snap every dot home, draw the final frame and stop until a pointer wakes it.
        settle(); light = target; settled = true;
        draw(time);
        running = false; last = 0;
        return;
      }
      draw(time);
      // Runs only while on screen in a visible tab.
      running = visible && !document.hidden;
      if (running) frame = requestAnimationFrame(step); else last = 0;
    };

    const start = () => { settled = false; running = true; cancelAnimationFrame(frame); frame = requestAnimationFrame(step); };

    // The light rising to its idle level over 400ms, eased out. A pointer that wakes the loop meanwhile
    // cancels it (start() cancels the frame), and the loop carries the light on from where it was.
    const switchOn = () => {
      const begin = performance.now();
      const ramp = (time: number) => {
        const progress = Math.min(1, Math.max(0, (time - begin) / 400));
        light = IDLE_LIGHT * (1 - Math.pow(1 - progress, 3));
        draw(time);
        if (progress < 1) frame = requestAnimationFrame(ramp);
      };
      cancelAnimationFrame(frame); frame = requestAnimationFrame(ramp);
    };

    // Scattered and waiting: the loop starts when the bulb is first on screen (the observer below).
    // Without the intro, whole and unlit until then.
    layout();
    if (reduceMotion) { settle(); light = IDLE_LIGHT; draw(0); } else if (!intro) { settle(); draw(0); } else scatter();

    const resize = new ResizeObserver(() => {
      layout();
      if (assembled) settle();
      draw(performance.now());
      if (!settled && visible) start();
    });
    resize.observe(wrap);
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && unlit) { unlit = false; if (!running) switchOn(); }
      if (visible && !settled) start();
    });
    onScreen.observe(wrap);
    const onVisibility = () => { if (!document.hidden && visible && !settled) start(); };
    document.addEventListener("visibilitychange", onVisibility);
    const onForcedColors = () => { readColors(); draw(performance.now()); };
    forcedColors.addEventListener("change", onForcedColors);

    const toLocal = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointerX = event.clientX - rect.left; pointerY = event.clientY - rect.top; };
    const onMove = (event: PointerEvent) => {
      toLocal(event); pointerActive = true;
      if (reduceMotion) { light = Math.hypot(pointerX - glassX, pointerY - glassY) < glassR ? 1 : IDLE_LIGHT; draw(0); } else if (!running) start();
    };
    const onLeave = () => { pointerActive = false; pointerX = pointerY = -1e4; if (reduceMotion) { light = IDLE_LIGHT; draw(0); } };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect(); onScreen.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      forcedColors.removeEventListener("change", onForcedColors);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, [tone, palette, intro]);

  return <div ref={wrapRef} aria-hidden="true" className={`relative w-full text-foreground ${className}`} style={{ aspectRatio: `1 / ${PARTICLE_BULB_RATIO.toFixed(4)}` }}>
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-pan-y" />
  </div>;
}
