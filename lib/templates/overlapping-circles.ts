import type { P5Template } from "./types";
import { getLightness } from "./utils";

interface CircleSpec {
  cx: number; // fraction of width
  cy: number; // fraction of height
  r: number;  // fraction of height
}

// Composed Bauhaus-style layout: one dominant anchor, two mediums for
// overlap, three smaller accents. Positions chosen so the larger circles
// overlap meaningfully; the smaller ones punctuate the empty space.
const CIRCLES: CircleSpec[] = [
  { cx: 0.35, cy: 0.62, r: 0.55 },
  { cx: 0.65, cy: 0.38, r: 0.32 },
  { cx: 0.80, cy: 0.62, r: 0.26 },
  { cx: 0.15, cy: 0.20, r: 0.13 },
  { cx: 0.92, cy: 0.18, r: 0.10 },
  { cx: 0.55, cy: 0.88, r: 0.11 },
];

export const overlappingCircles: P5Template = {
  id: "overlapping-circles",
  name: "Overlapping Circles",
  description: "Bauhaus-style composition of stacked circles in varying sizes",
  renderer: "p5",
  draw: (g, colors) => {
    if (colors.length < 2) return;

    const w = g.width;
    const h = g.height;

    const sortedByLightness = [...colors].sort(
      (a, b) => getLightness(b) - getLightness(a)
    );
    const bgColor = sortedByLightness[0];
    const circleColors = sortedByLightness.slice(1).reverse();
    if (circleColors.length === 0) return;

    g.smooth();
    g.background(bgColor);
    g.noStroke();

    const ordered = [...CIRCLES].sort((a, b) => b.r - a.r);

    ordered.forEach((c, i) => {
      const color = circleColors[i % circleColors.length];
      g.fill(color);
      const diameter = c.r * h * 2;
      g.ellipse(c.cx * w, c.cy * h, diameter, diameter);
    });
  },
};
