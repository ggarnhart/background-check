import type { WallpaperTemplate } from "./types";
import { drawDiagonalStripe } from "./utils";

export const equalStripes: WallpaperTemplate = {
  id: "equal-stripes",
  name: "Equal Stripes",
  description: "Equal width diagonal stripes using all colors",
  draw: (g, colors) => {
    if (colors.length === 0) return;

    const numColors = colors.length;
    colors.forEach((color, index) => {
      const start = index / numColors;
      const end = (index + 1) / numColors;
      drawDiagonalStripe(g, start, end, color, "bl-tr");
    });
  },
};
