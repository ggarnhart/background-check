import type { WallpaperTemplate } from "./types";
import { drawDiagonalStripe, getLightness } from "./utils";

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

    const accentWidth = 0.03;
    const mainWidth = (1 - accentWidth * (mainColors.length - 1)) / mainColors.length;

    let position = 0;

    mainColors.forEach((color, index) => {
      // Main color stripe
      drawDiagonalStripe(g, position, position + mainWidth, color, "tl-br");
      position += mainWidth;

      // Accent stripe (except after last)
      if (index < mainColors.length - 1) {
        drawDiagonalStripe(g, position, position + accentWidth, accentColor, "tl-br");
        position += accentWidth;
      }
    });
  },
};
