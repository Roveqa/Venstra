type RGB = { r: number; g: number; b: number };

function parseColor(value: string): RGB & { a: number } {
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }
  const match = value.match(/rgba?\(([^)]+)\)/);
  const parts = (match?.[1] ?? "0,0,0,1").split(",").map((s) => parseFloat(s.trim()));
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
}

function composite(c: RGB & { a: number }, bg: RGB): RGB {
  return {
    r: c.r * c.a + bg.r * (1 - c.a),
    g: c.g * c.a + bg.g * (1 - c.a),
    b: c.b * c.a + bg.b * (1 - c.a),
  };
}

function distance(a: RGB, b: RGB) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

const WHITE_BG: RGB = { r: 254, g: 254, b: 254 };
const BLACK_BG: RGB = { r: 4, g: 4, b: 4 };
const CONTRAST_THRESHOLD = 50;

/** True when a swatch would nearly disappear against its table background — needs a border to stay legible. */
export function needsSwatchBorder(value: string, background: "light" | "dark") {
  const bg = background === "light" ? WHITE_BG : BLACK_BG;
  const color = parseColor(value);

  // Alpha/translucent tokens always get a border in the design, regardless of computed contrast.
  if (color.a < 1) return true;

  return distance(composite(color, bg), bg) < CONTRAST_THRESHOLD;
}
