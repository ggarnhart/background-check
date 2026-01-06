"use client";

import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import type p5Type from "p5";
import type { WallpaperTemplate } from "@/lib/templates";

export interface WallpaperCanvasHandle {
  downloadImage: () => void;
}

interface WallpaperCanvasProps {
  colors: string[];
  template: WallpaperTemplate;
  className?: string;
}

const EXPORT_WIDTH = 3840;
const EXPORT_HEIGHT = 2160;

export const WallpaperCanvas = forwardRef<WallpaperCanvasHandle, WallpaperCanvasProps>(
  function WallpaperCanvas({ colors, template, className }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5Ref = useRef<p5Type | null>(null);
    const graphicsRef = useRef<p5Type.Graphics | null>(null);

    const draw = useCallback(() => {
      const p5 = p5Ref.current;
      const graphics = graphicsRef.current;
      if (!p5 || !graphics) return;

      // Clear and draw to off-screen graphics at full resolution
      graphics.clear();
      template.draw(graphics, colors);

      // Scale down to display canvas
      p5.clear();
      p5.image(graphics, 0, 0, p5.width, p5.height);
    }, [colors, template]);

    useEffect(() => {
      if (!containerRef.current) return;

      let p5Instance: p5Type | null = null;

      // Dynamic import for p5 (needs browser environment)
      import("p5").then((p5Module) => {
        const p5Constructor = p5Module.default;

        const sketch = (p: p5Type) => {
          p.setup = () => {
            // Create display canvas (responsive)
            const container = containerRef.current;
            if (!container) return;

            const displayWidth = container.clientWidth;
            const displayHeight = (displayWidth * EXPORT_HEIGHT) / EXPORT_WIDTH;

            p.createCanvas(displayWidth, displayHeight);
            p.pixelDensity(1);
            p.noLoop();

            // Create off-screen graphics at full 4K resolution
            graphicsRef.current = p.createGraphics(EXPORT_WIDTH, EXPORT_HEIGHT);

            p5Ref.current = p;

            // Initial draw
            template.draw(graphicsRef.current, colors);
            p.image(graphicsRef.current, 0, 0, p.width, p.height);
          };
        };

        p5Instance = new p5Constructor(sketch, containerRef.current!);
      });

      return () => {
        graphicsRef.current?.remove();
        p5Instance?.remove();
        p5Ref.current = null;
        graphicsRef.current = null;
      };
    }, []);

    // Redraw when colors or template change
    useEffect(() => {
      draw();
    }, [draw]);

    const downloadImage = useCallback(() => {
      const p5 = p5Ref.current;
      const graphics = graphicsRef.current;
      if (!p5 || !graphics) return;

      // Save the graphics buffer using p5's save method
      p5.save(graphics, `wallpaper-${template.id}-${Date.now()}.png`);
    }, [template.id]);

    useImperativeHandle(ref, () => ({
      downloadImage,
    }));

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          width: "100%",
          aspectRatio: `${EXPORT_WIDTH} / ${EXPORT_HEIGHT}`,
        }}
      />
    );
  }
);
