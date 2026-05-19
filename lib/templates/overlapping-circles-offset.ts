import type { P5Template } from "./types";
import { getLightness } from "./utils";

export const overlappingCirclesOffset: P5Template = {
  id: "overlapping-circles-offset",
  name: "Overlapping Circles (Off-Center)",
  description: "Concentric circles with the bright center pushed to the upper-left",
  renderer: "p5",
  draw: (g, colors) => {
    if (colors.length < 2) return;

    const w = g.width;
    const h = g.height;

    const ordered = [...colors].sort(
      (a, b) => getLightness(a) - getLightness(b)
    );

    g.smooth();
    g.background(ordered[0]);
    g.noStroke();

    // Offset center toward the upper-left third.
    const cx = w * 0.33;
    const cy = h * 0.36;

    // Size the outer ring against the farthest corner so the dark
    // background peeks through only at that corner, mirroring the
    // centered variant's edge bleed.
    const dxFar = Math.max(cx, w - cx);
    const dyFar = Math.max(cy, h - cy);
    const farCornerDist = Math.sqrt(dxFar * dxFar + dyFar * dyFar);
    const maxDiameter = farCornerDist * 2;
    const minDiameter = Math.min(w, h) * 0.18;

    const ringCount = ordered.length;
    for (let i = 0; i < ringCount; i++) {
      const t = ringCount === 1 ? 0 : i / (ringCount - 1);
      const diameter =
        maxDiameter * Math.pow(minDiameter / maxDiameter, t);
      g.fill(ordered[i]);
      g.ellipse(cx, cy, diameter, diameter);
    }
  },
};
