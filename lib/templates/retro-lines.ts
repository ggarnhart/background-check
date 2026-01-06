import type { WallpaperTemplate } from "./types";
import { drawDiagonalStripe } from "./utils";

export const retroLines: WallpaperTemplate = {
  id: "retro-lines",
  name: "Retro Lines",
  description: "Classic diagonal stripes with larger end colors",
  draw: (g, colors) => {
    if (colors.length < 3) return;

    // Fill entire background with last color first (prevents any white gaps)
    g.noStroke();
    g.fill(colors[colors.length - 1]);
    g.rect(0, 0, g.width, g.height);

    // First and last colors get larger areas
    // Middle colors are equal thin stripes
    const endColorWidth = 0.25; // 25% each for first and last
    const middleColors = colors.slice(1, -1);
    const middleTotalWidth = 1 - endColorWidth * 2; // 50% for middle stripes
    const middleStripeWidth = middleTotalWidth / middleColors.length;

    let position = 0;

    // First color (large area - top-left)
    drawDiagonalStripe(g, position, position + endColorWidth, colors[0], "tl-br");
    position += endColorWidth;

    // Middle colors (thin stripes)
    middleColors.forEach((color) => {
      drawDiagonalStripe(g, position, position + middleStripeWidth, color, "tl-br");
      position += middleStripeWidth;
    });

    // Last color is already the background, no need to draw it again
  },
};
