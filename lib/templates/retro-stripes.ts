import type { WallpaperTemplate } from "./types";
import { drawRotatedStripes, getLightness } from "./utils";

export const retroStripes: WallpaperTemplate = {
  id: "retro-stripes",
  name: "Retro Stripes",
  description: "Variable width stripes with thin accent lines",
  draw: (g, colors) => {
    if (colors.length < 2) return;

    // Sort by lightness - lightest becomes accent
    const sortedByLightness = [...colors].sort(
      (a, b) => getLightness(b) - getLightness(a)
    );

    const accentColor = sortedByLightness[0];
    const mainColors = sortedByLightness.slice(1, 5);

    // Build stripes: main colors with thin accents between
    const stripes: { color: string; size: number }[] = [];

    mainColors.forEach((color, index) => {
      stripes.push({ color, size: 3 }); // Main stripe
      if (index < mainColors.length - 1) {
        stripes.push({ color: accentColor, size: 0.3 }); // Thin accent
      }
    });

    drawRotatedStripes(g, stripes, "tl-br");
  },
};
