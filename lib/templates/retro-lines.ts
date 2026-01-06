import type { WallpaperTemplate } from "./types";
import { drawRotatedStripes } from "./utils";

export const retroLines: WallpaperTemplate = {
  id: "retro-lines",
  name: "Retro Lines",
  description: "Classic diagonal stripes with larger end colors",
  draw: (g, colors) => {
    if (colors.length < 3) return;

    // Build stripe definitions with sizes
    // First and last get size 2, middle colors get size 1
    const stripes = colors.map((color, index) => ({
      color,
      size: index === 0 || index === colors.length - 1 ? 2 : 1,
    }));

    drawRotatedStripes(g, stripes, "tl-br");
  },
};
