# Claude Notes

## Diagonal Stripe Rendering Strategy

### Problem
Drawing diagonal stripes that perfectly fill a canvas is tricky. Calculating polygon intersections with canvas edges leads to precision issues and white gaps at corners.

### Solution: Rotate and Overdraw
Instead of complex polygon math, use a simpler approach:

1. **Translate to center** of canvas (`translate(w/2, h/2)`)
2. **Rotate** by the diagonal angle (`atan2(height, width)`)
3. **Draw oversized rectangles** centered around the origin
   - Start at `-diagonal/2`, end at `+diagonal/2`
   - Height extends `-diagonal` to `+diagonal` (way past visible area)
4. **Let the canvas clip** naturally

This works because:
- Rectangles are simple to draw (no edge intersection math)
- Overdrawing ensures no gaps at corners
- p5.js handles clipping automatically
- Easy to reason about stripe widths as proportions

### Stripe Sizing
Stripes use relative `size` values:
```typescript
const stripes = colors.map((color, index) => ({
  color,
  size: index === 0 || index === colors.length - 1 ? 2 : 1,
}));
```
First/last colors get `size: 2`, middle colors get `size: 1`. The total is normalized to fill the diagonal.

### Direction
- `"tl-br"`: Top-left to bottom-right (rotate by +angle)
- `"bl-tr"`: Bottom-left to top-right (rotate by -angle)

## Smooth Bezier Curves with Paper.js

### Why Paper.js for Waves
p5.js is great for geometric shapes but struggles with ultra-smooth Bezier curves:
- p5.js treats curves as connected dots
- Paper.js treats them as mathematical paths with `.smooth()` function
- Paper.js produces cleaner anchor points (10 vs 5000)

### Dual Renderer Architecture
Templates specify their renderer:
```typescript
interface P5Template {
  renderer: "p5";
  draw: (g: p5.Graphics, colors: string[]) => void;
}

interface PaperTemplate {
  renderer: "paper";
  draw: (scope: PaperScope, width: number, height: number, colors: string[]) => void;
}
```

The `WallpaperGenerator` uses type guards to render with the correct canvas component.

### Paper.js Smooth Curves
```typescript
const path = new paper.Path();
path.add(new paper.Point(x1, y1));
path.add(new paper.Point(x2, y2));
// ... more points
path.smooth({ type: "continuous" }); // Magic!
```

## Tech Stack
- Next.js 16 + React 19
- **p5.js** for geometric templates (stripes, grids)
- **Paper.js** for smooth curve templates (flowing waves)
- shadcn/ui components
- TypeScript throughout
