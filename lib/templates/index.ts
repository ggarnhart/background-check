export type { WallpaperTemplate, P5Template, PaperTemplate, PaperScope } from "./types";
export { isP5Template, isPaperTemplate } from "./types";

import { retroStripes } from "./retro-stripes";
import { retroLines } from "./retro-lines";
import { equalStripes } from "./equal-stripes";
import { verticalStripes } from "./vertical-stripes";
import { flowingWaves } from "./flowing-waves";
import { flowingWavesPaper } from "./flowing-waves-paper";
import { circleGrid } from "./circle-grid";

export const templates = [
  flowingWavesPaper, // Paper.js version (smoother)
  flowingWaves,      // p5.js version
  retroLines,
  retroStripes,
  verticalStripes,
  equalStripes,
  circleGrid,
];

export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}
