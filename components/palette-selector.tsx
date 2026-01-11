"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { palettes, type ColorPalette, getCustomPalette } from "@/lib/palettes";
import { CustomPaletteEditor } from "@/components/custom-palette-editor";

interface PaletteSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

function PalettePreview({ colors }: { colors: string[] }) {
  return (
    <div className="flex h-4 w-16 overflow-hidden rounded-sm">
      {colors.slice(0, 5).map((color, index) => (
        <div
          key={index}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export function PaletteSelector({ value, onValueChange }: PaletteSelectorProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [customPalette, setCustomPalette] = useState<ColorPalette | undefined>();

  useEffect(() => {
    setCustomPalette(getCustomPalette());
  }, []);

  const selectedPalette =
    value === 'custom' ? customPalette : palettes.find((p) => p.id === value);

  const handleEditorSave = () => {
    const updated = getCustomPalette();
    setCustomPalette(updated);
    setShowEditor(false);
    if (updated) {
      onValueChange('custom');
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue>
              {selectedPalette && (
                <div className="flex items-center gap-2">
                  <PalettePreview colors={selectedPalette.colors} />
                  <span>{selectedPalette.name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {palettes.map((palette) => (
              <SelectItem key={palette.id} value={palette.id}>
                <div className="flex items-center gap-2">
                  <PalettePreview colors={palette.colors} />
                  <span>{palette.name}</span>
                </div>
              </SelectItem>
            ))}
            {customPalette && (
              <SelectItem value="custom">
                <div className="flex items-center gap-2">
                  <PalettePreview colors={customPalette.colors} />
                  <span>{customPalette.name}</span>
                </div>
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button
          onClick={() => setShowEditor(true)}
          size="lg"
          variant="outline"
          title="Edit custom palette"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </div>

      {showEditor && (
        <CustomPaletteEditor
          onSave={handleEditorSave}
          onClose={() => setShowEditor(false)}
        />
      )}
    </>
  );
}
