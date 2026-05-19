export type { WallpaperTemplate, P5Template, PaperTemplate, PaperScope, WaveSettings } from "./types";
export { isP5Template, isPaperTemplate } from "./types";

import { retroStripes } from "./retro-stripes";
import { retroLines } from "./retro-lines";
import { chevronStripes } from "./chevron-stripes";
import { equalStripes } from "./equal-stripes";
import { verticalStripes } from "./vertical-stripes";
import { flowingWaves } from "./flowing-waves";
import { flowingWavesPaper } from "./flowing-waves-paper";
import { circleGrid } from "./circle-grid";
import { overlappingCircles } from "./overlapping-circles";
import { overlappingCirclesOffset } from "./overlapping-circles-offset";

export const templates = [
  flowingWavesPaper, // Paper.js version (smoother)
  flowingWaves,      // p5.js version
  retroLines,
  retroStripes,
  chevronStripes,
  verticalStripes,
  equalStripes,
  circleGrid,
  overlappingCircles,
  overlappingCirclesOffset,
];

export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}
