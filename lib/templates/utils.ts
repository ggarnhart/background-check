import type p5 from "p5";

/**
 * Draw diagonal stripes using rotation - much simpler than polygon math.
 * Stripes extend way past canvas bounds and get clipped naturally.
 */
export function drawRotatedStripes(
  g: p5.Graphics,
  stripes: { color: string; size: number }[],
  direction: "tl-br" | "bl-tr"
) {
  const w = g.width;
  const h = g.height;

  // Calculate the diagonal length
  const diagonal = Math.sqrt(w * w + h * h);

  // Angle of the diagonal
  const angle = Math.atan2(h, w);

  // Total size units
  const totalSize = stripes.reduce((sum, s) => sum + s.size, 0);

  g.push();
  g.noStroke();

  // Translate to center, rotate, then draw centered stripes
  g.translate(w / 2, h / 2);

  if (direction === "tl-br") {
    g.rotate(angle);
  } else {
    g.rotate(-angle);
  }

  // Draw stripes centered around origin
  // Total width = diagonal, so start at -diagonal/2
  let position = -diagonal / 2;

  stripes.forEach(({ color, size }) => {
    const stripeWidth = (size / totalSize) * diagonal;
    g.fill(color);
    // Tall rectangle to ensure full coverage
    g.rect(position, -diagonal, stripeWidth, diagonal * 2);
    position += stripeWidth;
  });

  g.pop();
}

// Estimate perceived lightness from hex color (0-1)
export function getLightness(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
