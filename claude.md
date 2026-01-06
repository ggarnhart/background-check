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

## Tech Stack
- Next.js 16 + React 19
- p5.js for canvas rendering (instance mode, dynamic import for SSR compatibility)
- shadcn/ui components
- TypeScript throughout
