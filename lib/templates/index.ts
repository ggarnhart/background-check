export type { WallpaperTemplate } from "./types";

import { retroStripes } from "./retro-stripes";
import { retroLines } from "./retro-lines";
import { equalStripes } from "./equal-stripes";
import { verticalStripes } from "./vertical-stripes";
import { flowingWaves } from "./flowing-waves";
import { circleGrid } from "./circle-grid";

export const templates = [flowingWaves, retroLines, retroStripes, verticalStripes, equalStripes, circleGrid];


export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}
