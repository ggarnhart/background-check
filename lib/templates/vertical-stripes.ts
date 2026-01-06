import type { WallpaperTemplate } from "./types";

export const verticalStripes: WallpaperTemplate = {
  id: "vertical-stripes",
  name: "Vertical Stripes",
  description: "5 equal width vertical stripes",
  draw: (g, colors) => {
    if (colors.length === 0) return;

    const stripeCount = 5;
    const stripeWidth = g.width / stripeCount;

    g.noStroke();
    for (let i = 0; i < stripeCount; i++) {
      g.fill(colors[i % colors.length]);
      g.rect(i * stripeWidth, 0, stripeWidth, g.height);
    }
  },
};
