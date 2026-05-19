import type { P5Template } from "./types";
import { getLightness } from "./utils";

export const overlappingCircles: P5Template = {
  id: "overlapping-circles",
  name: "Overlapping Circles",
  description: "Concentric circles fading from dark edges to a bright center",
  renderer: "p5",
  draw: (g, colors) => {
    if (colors.length < 2) return;

    const w = g.width;
    const h = g.height;

    // Darkest first (outer ring), lightest last (center).
    const ordered = [...colors].sort(
      (a, b) => getLightness(a) - getLightness(b)
    );

    g.smooth();
    g.background(ordered[0]);
    g.noStroke();

    const cx = w / 2;
    const cy = h / 2;
    // Outer ring bleeds past the longer edge so the background color
    // peeks through only at the corners, like the reference image.
    const maxDiameter = Math.max(w, h) * 1.15;
    const minDiameter = Math.min(w, h) * 0.18;

    const ringCount = ordered.length;
    for (let i = 0; i < ringCount; i++) {
      const t = ringCount === 1 ? 0 : i / (ringCount - 1);
      // Geometric falloff from maxDiameter to minDiameter.
      const diameter =
        maxDiameter * Math.pow(minDiameter / maxDiameter, t);
      g.fill(ordered[i]);
      g.ellipse(cx, cy, diameter, diameter);
    }
  },
};
