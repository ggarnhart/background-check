import type p5 from "p5";
import type { P5Template } from "./types";
import { getLightness } from "./utils";

/**
 * Creates smooth, flowing wave shapes inspired by macOS wallpapers.
 * Layers organic bezier curves from opposing corners with ultra-smooth edges.
 * Note: This is the p5.js version. See flowing-waves-paper.ts for smoother Paper.js version.
 */
export const flowingWaves: P5Template = {
  id: "flowing-waves",
  name: "Flowing Waves (p5)",
  description: "Organic, layered waves flowing from opposite corners",
  renderer: "p5",
  draw: (g, colors) => {
    if (colors.length < 3) return;

    const w = g.width;
    const h = g.height;

    // Sort colors by lightness
    const sortedByLightness = [...colors].sort(
      (a, b) => getLightness(b) - getLightness(a)
    );

    // Lightest color becomes background
    const bgColor = sortedByLightness[0];
    const otherColors = sortedByLightness.slice(1);

    // Separate warm and cool colors
    const warmColors: string[] = [];
    const coolColors: string[] = [];

    otherColors.forEach((hex) => {
      const hue = getHue(hex);
      if ((hue >= 0 && hue <= 60) || hue >= 300) {
        warmColors.push(hex);
      } else {
        coolColors.push(hex);
      }
    });

    // Fallback if all colors are one temperature
    if (warmColors.length === 0 || coolColors.length === 0) {
      const midPoint = Math.ceil(otherColors.length / 2);
      warmColors.length = 0;
      coolColors.length = 0;
      warmColors.push(...otherColors.slice(0, midPoint));
      coolColors.push(...otherColors.slice(midPoint));
    }

    // Sort: lightest first (drawn first = furthest reaching)
    warmColors.sort((a, b) => getLightness(b) - getLightness(a));
    coolColors.sort((a, b) => getLightness(b) - getLightness(a));

    // Fill background
    g.noStroke();
    g.fill(bgColor);
    g.rect(0, 0, w, h);

    // Draw waves
    drawWaveGroup(g, warmColors, w, h, "top-right");
    drawWaveGroup(g, coolColors, w, h, "bottom-left");
  },
};

const getHue = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const gVal = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, gVal, b);
  const min = Math.min(r, gVal, b);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue = 0;
  if (max === r) {
    hue = ((gVal - b) / delta) % 6;
  } else if (max === gVal) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - gVal) / delta + 4;
  }

  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;

  return hue;
};

const drawWaveGroup = (
  g: p5.Graphics,
  colors: string[],
  w: number,
  h: number,
  origin: "top-right" | "bottom-left"
) => {
  if (colors.length === 0) return;

  colors.forEach((color, index) => {
    drawFlowingWave(g, color, w, h, origin, index, colors.length);
  });
};

/**
 * Compute a point on a cubic bezier curve
 */
const bezierPoint = (
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number => {
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  return mt3 * p0 + 3 * mt2 * t * p1 + 3 * mt * t2 * p2 + t3 * p3;
};

/**
 * Draw a flowing wave using many vertices for smooth curves.
 */
const drawFlowingWave = (
  g: p5.Graphics,
  color: string,
  w: number,
  h: number,
  origin: "top-right" | "bottom-left",
  layerIndex: number,
  totalLayers: number
) => {
  g.fill(color);
  g.noStroke();

  // Retraction factor - how much each layer pulls back toward corner
  const r = layerIndex * 0.12;

  // Number of segments for smooth curve
  const segments = 60;

  g.beginShape();

  if (origin === "top-right") {
    // Start off-canvas top-right
    g.vertex(w * 1.3, -h * 0.3);
    g.vertex(w * 1.05, h * (-0.05 + r * 0.15));

    // Define bezier control points for organic S-curve wave
    // The curve flows from top-right, dips down with a bulge, then exits left
    const p0 = { x: w * 1.05, y: h * (-0.05 + r * 0.15) };
    const p1 = { x: w * 0.72, y: h * (0.28 - r * 0.45) };  // Control pulls down-left
    const p2 = { x: w * 0.25, y: h * (0.55 - r * 0.32) };  // Control for bulge
    const p3 = { x: w * -0.12, y: h * (0.08 - r * 0.08) }; // Exit point

    // Draw curve using many vertices
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = bezierPoint(t, p0.x, p1.x, p2.x, p3.x);
      const y = bezierPoint(t, p0.y, p1.y, p2.y, p3.y);
      g.vertex(x, y);
    }

    // Close the shape
    g.vertex(-w * 0.3, -h * 0.3);
    g.vertex(w * 1.3, -h * 0.3);

  } else {
    // Start off-canvas bottom-left
    g.vertex(-w * 0.3, h * 1.3);
    g.vertex(-w * 0.05, h * (1.05 - r * 0.15));

    // Define bezier control points for organic S-curve wave
    // The curve flows from bottom-left, rises with a bulge, then exits right
    const p0 = { x: w * -0.05, y: h * (1.05 - r * 0.15) };
    const p1 = { x: w * 0.28, y: h * (0.72 + r * 0.45) };  // Control pulls up-right
    const p2 = { x: w * 0.75, y: h * (0.45 + r * 0.32) };  // Control for bulge
    const p3 = { x: w * 1.12, y: h * (0.92 + r * 0.08) };  // Exit point

    // Draw curve using many vertices
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = bezierPoint(t, p0.x, p1.x, p2.x, p3.x);
      const y = bezierPoint(t, p0.y, p1.y, p2.y, p3.y);
      g.vertex(x, y);
    }

    // Close the shape
    g.vertex(w * 1.3, h * 1.3);
    g.vertex(-w * 0.3, h * 1.3);
  }

  g.endShape(g.CLOSE);
};
