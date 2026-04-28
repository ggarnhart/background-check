import type { P5Template } from "./types";
import { drawRightwardChevronStripes } from "./utils";

export const chevronStripes: P5Template = {
  id: "chevron-stripes",
  name: "Chevron Stripes",
  description: "Rightward-facing chevrons with stacked color bands",
  renderer: "p5",
  draw: (g, colors) => {
    if (colors.length < 3) return;

    const stripes = colors.map((color, index) => ({
      color,
      size: index === 0 || index === colors.length - 1 ? 3.5 : 1,
    }));

    drawRightwardChevronStripes(g, stripes);
  },
};
