import type { P5Template } from "./types";
import { drawRotatedStripes } from "./utils";

export const equalStripes: P5Template = {
  id: "equal-stripes",
  name: "Equal Stripes",
  description: "Equal width diagonal stripes using all colors",
  renderer: "p5",
  draw: (g, colors) => {
    if (colors.length === 0) return;

    const stripes = colors.map((color) => ({ color, size: 1 }));
    drawRotatedStripes(g, stripes, "bl-tr");
  },
};
