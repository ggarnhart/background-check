export type { WallpaperTemplate } from "./types";

import { retroStripes } from "./retro-stripes";
import { retroLines } from "./retro-lines";
import { equalStripes } from "./equal-stripes";
import { verticalStripes } from "./vertical-stripes";

export const templates = [retroLines, retroStripes, verticalStripes, equalStripes];

export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}
