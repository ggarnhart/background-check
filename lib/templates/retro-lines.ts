import type { P5Template } from "./types";
import { drawRotatedStripes } from "./utils";

export const retroLines: P5Template = {
  id: "retro-lines",
  name: "Retro Lines",
  description: "Classic diagonal stripes with larger end colors",
  renderer: "p5",
  draw: (g, colors) => {
    if (colors.length < 3) return;

    // Build stripe definitions with sizes
    // First and last get size 2, middle colors get size 1
    const stripes = colors.map((color, index) => ({
      color,
      size: index === 0 || index === colors.length - 1 ? 3.5 : 1,
    }));

    drawRotatedStripes(g, stripes, "tl-br");
  },
};
