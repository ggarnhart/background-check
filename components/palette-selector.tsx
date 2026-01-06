"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { palettes, type ColorPalette } from "@/lib/palettes";

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
  const selectedPalette = palettes.find((p) => p.id === value);

  return (
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
      </SelectContent>
    </Select>
  );
}
