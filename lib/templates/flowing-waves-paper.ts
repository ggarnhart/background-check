import type { PaperTemplate, PaperScope } from "./types";
import { getLightness } from "./utils";

/**
 * Creates smooth, flowing wave shapes using Paper.js.
 * A diagonal strip of background color runs from top-left to bottom-right,
 * with wavy-edged color regions filling the corners.
 */
export const flowingWavesPaper: PaperTemplate = {
  id: "flowing-waves-paper",
  name: "Flowing Waves",
  description: "Ultra-smooth organic waves using Paper.js",
  renderer: "paper",
  draw: (paper, width, height, colors) => {
    if (colors.length < 3) return;

    // Sort colors by lightness
    const sortedByLightness = [...colors].sort(
      (a, b) => getLightness(b) - getLightness(a)
    );

    // Lightest color becomes background (the diagonal strip)
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

    // Sort by lightness (darkest = outermost layer, drawn first)
    // Darkest fills most area, then lighter layers on top closer to corner
    warmColors.sort((a, b) => getLightness(a) - getLightness(b));
    coolColors.sort((a, b) => getLightness(a) - getLightness(b));

    // Debug: log what colors we're using
    console.log("Background:", bgColor);
    console.log("Warm colors:", warmColors);
    console.log("Cool colors:", coolColors);

    // Draw background (this creates the diagonal "strip")
    const bg = new paper.Path.Rectangle(
      new paper.Point(0, 0),
      new paper.Size(width, height)
    );
    bg.fillColor = new paper.Color(bgColor);

    // Draw warm waves (top-left corner, radiating toward top-left)
    drawCornerWaves(paper, warmColors, width, height, "top-left");

    // Draw cool waves (bottom-right corner, radiating toward bottom-right)
    drawCornerWaves(paper, coolColors, width, height, "bottom-right");
  },
};

const getHue = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue = 0;
  if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }

  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;

  return hue;
};

const drawCornerWaves = (
  paper: PaperScope,
  colors: string[],
  w: number,
  h: number,
  corner: "top-left" | "bottom-right"
) => {
  if (colors.length === 0) return;

  colors.forEach((color, index) => {
    drawWavyCornerFill(paper, color, w, h, corner, index, colors.length);
  });
};

// Shared wave shape - x positions and amplitude offsets
// Waves go from right edge (x=1.0) to left edge (x=-0.05)
const WAVE_POINTS = [
  { x: 1.0, amp: 0 },
  { x: 0.85, amp: 0.08 },   // dip
  { x: 0.7, amp: 0.02 },    // rise
  { x: 0.55, amp: 0.12 },   // dip
  { x: 0.4, amp: 0.05 },    // rise
  { x: 0.25, amp: 0.15 },   // dip
  { x: 0.1, amp: 0.08 },    // rise
  { x: -0.05, amp: 0.18 },  // final dip
];

/**
 * Draw a wavy-edged fill that covers a corner.
 * The edge has multiple wave undulations.
 * Layers are drawn from outermost (lightest, index 0) to innermost (darkest).
 */
const drawWavyCornerFill = (
  paper: PaperScope,
  color: string,
  w: number,
  h: number,
  corner: "top-left" | "bottom-right",
  layerIndex: number,
  totalLayers: number
) => {
  // Offset increases for each layer, pushing wave edge toward center
  // More layers = tighter spacing to fit them all
  const layerSpacing = Math.min(0.10, 0.35 / Math.max(totalLayers, 1));
  const offset = layerIndex * layerSpacing;

  const path = new paper.Path();
  path.fillColor = new paper.Color(color);

  if (corner === "top-left") {
    // Fill top-left corner with wavy bottom edge
    path.add(new paper.Point(-w * 0.1, -h * 0.1));
    path.add(new paper.Point(w * 1.1, -h * 0.1));

    // Wavy edge using shared wave shape
    const baseY = 0.38; // Base distance from top
    for (const pt of WAVE_POINTS) {
      path.add(new paper.Point(w * pt.x, h * (baseY + pt.amp - offset)));
    }

    // Close along left edge
    path.add(new paper.Point(-w * 0.1, h * 0.7));
    path.add(new paper.Point(-w * 0.1, -h * 0.1));
    path.closePath();
  } else {
    // Fill bottom-right corner with wavy top edge
    path.add(new paper.Point(w * 1.1, h * 1.1));
    path.add(new paper.Point(-w * 0.1, h * 1.1));

    // Wavy edge using shared wave shape (reversed order: left to right)
    // Same amplitude direction as top-left so waves align vertically
    const baseY = 0.62; // Base distance from top
    for (let i = WAVE_POINTS.length - 1; i >= 0; i--) {
      const pt = WAVE_POINTS[i];
      path.add(new paper.Point(w * pt.x, h * (baseY + pt.amp + offset)));
    }

    // Close along right edge
    path.add(new paper.Point(w * 1.1, h * 0.3));
    path.add(new paper.Point(w * 1.1, h * 1.1));
    path.closePath();
  }

  // Apply Paper.js's smooth() for ultra-clean Bezier curves
  path.smooth({ type: "continuous" });
};
