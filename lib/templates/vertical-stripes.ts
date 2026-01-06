import type { P5Template } from "./types";

export const verticalStripes: P5Template = {
  id: "vertical-stripes",
  name: "Vertical Stripes",
  description: "5 equal width vertical stripes",
  renderer: "p5",
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
