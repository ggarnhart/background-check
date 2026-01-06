import type { P5Template } from "./types";

export const circleGrid: P5Template = {
  id: "circle-grid",
  name: "Circle Grid",
  description: "8x8 grid of circles with one unique accent circle",
  renderer: "p5",
  draw: (g, colors) => {
    const w = g.width;
    const h = g.height;

    // Use provided colors or defaults
    const bgColor = colors[2] || "#3d405b";
    const circleColor = colors[0] || "#f4f1de";
    const accentColor = colors[1] || "#e07a5f";

    // Enable anti-aliasing for smooth circles
    g.smooth();

    // Fill background
    g.background(bgColor);
    g.noStroke();

    const gridSize = 8;
    const padding = Math.min(w, h) * 0.08;
    const availableWidth = w - padding * 2;
    const availableHeight = h - padding * 2;

    const cellWidth = availableWidth / gridSize;
    const cellHeight = availableHeight / gridSize;
    const circleSize = Math.min(cellWidth, cellHeight) * 0.7;

    // Draw 8x8 grid of circles
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const circleIndex = row * gridSize + col + 1; // 1-indexed
        const x = padding + col * cellWidth + cellWidth / 2;
        const y = padding + row * cellHeight + cellHeight / 2;

        // 42nd circle is special
        const color = circleIndex === 42 ? accentColor : circleColor;
        g.fill(color);
        // Add matching stroke for smoother anti-aliased edges
        g.stroke(color);
        g.strokeWeight(2);

        g.ellipse(x, y, circleSize, circleSize);
      }
    }
  },
};
