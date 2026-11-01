// 5×7 dot-matrix digits in the bulb's dot language, rows top to bottom, "1" = on.
const DIGITS: Record<string, string[]> = {
  "0": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
};

// `sm` is drawn at 42px tall with heavier lit dots and smaller unlit ones, so its digits still read
// at phone size (the md ratio scaled down to that size leaves thin dots lost in the grey grid).
const SIZES = { sm: { pitch: 6, radius: 2.1, unlit: 1.3 }, md: { pitch: 10, radius: 2.6, unlit: 2.6 }, lg: { pitch: 14, radius: 3.6, unlit: 3.6 } };

/**
 * A number drawn as a dot-matrix display: lit dots in ink over a faint grid of unlit grey dots, one
 * empty column between digits. Used for the catalogue hero's counts (`sm` on phones, `md` from lg)
 * and for "404". Exposed to assistive technology as an image named by `label` (default: the digits).
 */
export function DotNumeral({ value, label, size = "md", className = "" }: { value: string; label?: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const { pitch, radius, unlit } = SIZES[size];
  const digits = value.replace(/\D/g, "").split("");
  const columns = digits.length * 6 - 1;
  const dots = digits.flatMap((digit, d) => DIGITS[digit].flatMap((row, r) => row.split("").map((bit, c) => ({ x: (d * 6 + c) * pitch + pitch / 2, y: r * pitch + pitch / 2, on: bit === "1" }))));
  return <svg role="img" aria-label={label ?? value} width={columns * pitch} height={7 * pitch} viewBox={`0 0 ${columns * pitch} ${7 * pitch}`} className={`block max-w-full ${className}`}>
    {dots.map((dot) => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r={dot.on ? radius : unlit} fill={dot.on ? "var(--foreground)" : "var(--border)"} opacity={dot.on ? 1 : 0.9} />)}
  </svg>;
}
