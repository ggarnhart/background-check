"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Download, MessageCirclePlus, Share2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PaletteSelector } from "@/components/palette-selector";
import { TemplateSelector } from "@/components/template-selector";
import { WallpaperCanvas, type WallpaperCanvasHandle } from "@/components/wallpaper-canvas";
import { PaperCanvas, type PaperCanvasHandle } from "@/components/paper-canvas";
import { WaveSettings, defaultWaveSettings } from "@/components/wave-settings";
import { palettes, getPaletteById, saveCustomPalette } from "@/lib/palettes";
import { templates, getTemplateById, isP5Template, isPaperTemplate } from "@/lib/templates";
import type { P5Template, PaperTemplate, WaveSettings as WaveSettingsType } from "@/lib/templates";
import { useTakeIssue } from "takeissue";

export function WallpaperGenerator() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedPaletteId, setSelectedPaletteId] = useState(palettes[0].id);
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [waveSettings, setWaveSettings] = useState<WaveSettingsType>(defaultWaveSettings);
  const [shareButtonState, setShareButtonState] = useState<'idle' | 'copied'>('idle');
  const p5CanvasRef = useRef<WallpaperCanvasHandle>(null);
  const paperCanvasRef = useRef<PaperCanvasHandle>(null);
  const [initialized, setInitialized] = useState(false);

  const selectedPalette = getPaletteById(selectedPaletteId);
  const selectedTemplate = getTemplateById(selectedTemplateId);
  const colors = selectedPalette?.colors ?? [];
  const showWaveSettings = selectedTemplate && isPaperTemplate(selectedTemplate) && selectedTemplate.supportsWaveSettings;

  const { openTakeIssue } = useTakeIssue();

  // Initialize from URL parameters on mount
  useEffect(() => {
    if (initialized) return;

    const paletteParam = searchParams.get('palette');
    const templateParam = searchParams.get('template');
    const colorsParam = searchParams.get('colors');
    const wavesParam = searchParams.get('waves');
    const amplitudeParam = searchParams.get('amplitude');

    // Handle custom colors from URL
    if (colorsParam) {
      const customColors = colorsParam.split(',').map(c => c.trim().startsWith('#') ? c.trim() : `#${c.trim()}`);
      if (customColors.length > 0) {
        saveCustomPalette(customColors);
        setSelectedPaletteId('custom');
      }
    } else if (paletteParam) {
      // Use predefined palette if it exists
      const palette = getPaletteById(paletteParam);
      if (palette) {
        setSelectedPaletteId(paletteParam);
      }
    }

    // Set template if provided and valid
    if (templateParam) {
      const template = getTemplateById(templateParam);
      if (template) {
        setSelectedTemplateId(templateParam);
      }
    }

    // Set wave settings if provided
    if (wavesParam || amplitudeParam) {
      setWaveSettings({
        waveCount: wavesParam ? parseInt(wavesParam, 10) : defaultWaveSettings.waveCount,
        amplitude: amplitudeParam ? parseInt(amplitudeParam, 10) : defaultWaveSettings.amplitude,
      });
    }

    setInitialized(true);
  }, [searchParams, initialized]);

  // Update URL when selections change (after initialization)
  useEffect(() => {
    if (!initialized) return;

    const params = new URLSearchParams();

    // Add palette info
    if (selectedPaletteId === 'custom' && selectedPalette) {
      params.set('colors', selectedPalette.colors.map(c => c.replace('#', '')).join(','));
    } else if (selectedPaletteId !== palettes[0].id) {
      params.set('palette', selectedPaletteId);
    }

    // Add template if not default
    if (selectedTemplateId !== templates[0].id) {
      params.set('template', selectedTemplateId);
    }

    // Add wave settings if they differ from defaults
    if (showWaveSettings) {
      if (waveSettings.waveCount !== defaultWaveSettings.waveCount) {
        params.set('waves', waveSettings.waveCount.toString());
      }
      if (waveSettings.amplitude !== defaultWaveSettings.amplitude) {
        params.set('amplitude', waveSettings.amplitude.toString());
      }
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [selectedPaletteId, selectedTemplateId, waveSettings, initialized, router, showWaveSettings, selectedPalette]);

  const handleDownload = () => {
    if (selectedTemplate && isP5Template(selectedTemplate)) {
      p5CanvasRef.current?.downloadImage();
    } else {
      paperCanvasRef.current?.downloadImage();
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShareButtonState('copied');
      setTimeout(() => setShareButtonState('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  if (!selectedTemplate) return null;

  return (
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
        <Button onClick={handleShare} size="lg" variant="outline">
          {shareButtonState === 'copied' ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </>
          )}
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
  );
}
