"use client";

import { useRef, useState } from "react";
import { Download, MessageCirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PaletteSelector } from "@/components/palette-selector";
import { TemplateSelector } from "@/components/template-selector";
import { WallpaperCanvas, type WallpaperCanvasHandle } from "@/components/wallpaper-canvas";
import { PaperCanvas, type PaperCanvasHandle } from "@/components/paper-canvas";
import { WaveSettings, defaultWaveSettings } from "@/components/wave-settings";
import { CommandPalette } from "@/components/command-palette";
import { palettes, getPaletteById } from "@/lib/palettes";
import { templates, getTemplateById, isP5Template, isPaperTemplate } from "@/lib/templates";
import type { P5Template, PaperTemplate, WaveSettings as WaveSettingsType } from "@/lib/templates";
import { useTakeIssue } from "takeissue";

export function WallpaperGenerator() {
  const [selectedPaletteId, setSelectedPaletteId] = useState(palettes[0].id);
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [waveSettings, setWaveSettings] = useState<WaveSettingsType>(defaultWaveSettings);
  const p5CanvasRef = useRef<WallpaperCanvasHandle>(null);
  const paperCanvasRef = useRef<PaperCanvasHandle>(null);

  const selectedPalette = getPaletteById(selectedPaletteId);
  const selectedTemplate = getTemplateById(selectedTemplateId);
  const colors = selectedPalette?.colors ?? [];
  const showWaveSettings = selectedTemplate && isPaperTemplate(selectedTemplate) && selectedTemplate.supportsWaveSettings;

  const { openTakeIssue } = useTakeIssue();

  const handleDownload = () => {
    if (selectedTemplate && isP5Template(selectedTemplate)) {
      p5CanvasRef.current?.downloadImage();
    } else {
      paperCanvasRef.current?.downloadImage();
    }
  };

  if (!selectedTemplate) return null;

  return (
    <>
      <CommandPalette onSubmitIssue={openTakeIssue} onDownload={handleDownload} />
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Background Check</h1>
        <p className="text-muted-foreground text-sm">Generate 4K wallpapers from color palettes</p>
      </div>

      <div className="w-full max-w-4xl overflow-hidden rounded-xl border shadow-lg">
        {isP5Template(selectedTemplate) ? (
          <WallpaperCanvas
            ref={p5CanvasRef}
            colors={colors}
            template={selectedTemplate as P5Template}
          />
        ) : isPaperTemplate(selectedTemplate) ? (
          <PaperCanvas
            ref={paperCanvasRef}
            colors={colors}
            template={selectedTemplate as PaperTemplate}
            waveSettings={waveSettings}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <TemplateSelector
          value={selectedTemplateId}
          onValueChange={setSelectedTemplateId}
        />
        <PaletteSelector
          value={selectedPaletteId}
          onValueChange={setSelectedPaletteId}
        />
        <Button onClick={handleDownload} size="lg">
          <Download className="mr-2 h-4 w-4" />
          Download 4K
        </Button>
        <Button onClick={openTakeIssue} size="lg" variant="outline">
          <MessageCirclePlus className="mr-2 h-4 w-4" />
          Feedback
        </Button>
      </div>

      {showWaveSettings && (
        <WaveSettings values={waveSettings} onChange={setWaveSettings} />
      )}
      </div>
    </>
  );
}
