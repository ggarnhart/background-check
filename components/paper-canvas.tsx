"use client";

import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle, useState } from "react";
import type { PaperTemplate, WaveSettings } from "@/lib/templates";

export interface PaperCanvasHandle {
  downloadImage: () => void;
}

interface PaperCanvasProps {
  colors: string[];
  template: PaperTemplate;
  waveSettings?: WaveSettings;
  className?: string;
}

const EXPORT_WIDTH = 3840;
const EXPORT_HEIGHT = 2160;

export const PaperCanvas = forwardRef<PaperCanvasHandle, PaperCanvasProps>(
  function PaperCanvas({ colors, template, waveSettings, className }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isReady, setIsReady] = useState(false);

    const draw = useCallback(async () => {
      const canvas = canvasRef.current;
      if (!canvas || typeof window === "undefined") return;

      // Dynamic import Paper.js only on client side
      const paperModule = await import("paper");
      const paper = paperModule.default;

      // Setup paper on canvas
      paper.setup(canvas);
      paper.view.viewSize = new paper.Size(EXPORT_WIDTH, EXPORT_HEIGHT);

      // Clear previous content
      paper.project.clear();

      // Call the template's draw function with optional wave settings
      template.draw(paper, EXPORT_WIDTH, EXPORT_HEIGHT, colors, waveSettings);

      // Render
      paper.view.update();
      setIsReady(true);
    }, [colors, template, waveSettings]);

    useEffect(() => {
      draw();
    }, [draw]);

    const downloadImage = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = `wallpaper-${template.id}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }, [template.id]);

    useImperativeHandle(ref, () => ({
      downloadImage,
    }));

    return (
      <canvas
        ref={canvasRef}
        className={className}
        width={EXPORT_WIDTH}
        height={EXPORT_HEIGHT}
        data-paper-resize="true"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${EXPORT_WIDTH} / ${EXPORT_HEIGHT}`,
        }}
      />
    );
  }
);
