import type p5 from "p5";

// Get points where a diagonal line intersects the canvas edges
export function getDiagonalLinePoints(
  width: number,
  height: number,
  t: number,
  direction: "bl-tr" | "tl-br"
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];

  if (direction === "tl-br") {
    // t=0 at top-left corner, t=1 at bottom-right corner
    const c = 2 * t;

    const leftY = c * height;
    if (leftY >= 0 && leftY <= height) points.push({ x: 0, y: leftY });

    const topX = c * width;
    if (topX >= 0 && topX <= width) points.push({ x: topX, y: 0 });

    const rightY = (c - 1) * height;
    if (rightY >= 0 && rightY <= height) points.push({ x: width, y: rightY });

    const bottomX = (c - 1) * width;
    if (bottomX >= 0 && bottomX <= width) points.push({ x: bottomX, y: height });
  } else {
    // bl-tr: t=0 at bottom-left, t=1 at top-right
    const c = 2 * t - 1;

    const leftY = -c * height;
    if (leftY >= 0 && leftY <= height) points.push({ x: 0, y: leftY });

    const bottomX = (c + 1) * width;
    if (bottomX >= 0 && bottomX <= width) points.push({ x: bottomX, y: height });

    const rightY = (1 - c) * height;
    if (rightY >= 0 && rightY <= height) points.push({ x: width, y: rightY });

    const topX = c * width;
    if (topX >= 0 && topX <= width) points.push({ x: topX, y: 0 });
  }

  // Sort points by angle from center for proper polygon winding
  if (points.length > 2) {
    const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const cy = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    points.sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
  }

  return points;
}

// Draw a diagonal stripe between two t values
export function drawDiagonalStripe(
  g: p5.Graphics,
  t1: number,
  t2: number,
  color: string,
  direction: "bl-tr" | "tl-br"
) {
  const line1 = getDiagonalLinePoints(g.width, g.height, t1, direction);
  const line2 = getDiagonalLinePoints(g.width, g.height, t2, direction);
  const points = [...line1, ...line2.reverse()];

  if (points.length < 3) return;

  g.fill(color);
  g.noStroke();
  g.beginShape();
  for (const p of points) {
    g.vertex(p.x, p.y);
  }
  g.endShape(g.CLOSE);
}

// Estimate perceived lightness from hex color (0-1)
export function getLightness(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
