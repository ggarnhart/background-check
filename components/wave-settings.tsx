"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export interface WaveSettingsValues {
  waveCount: number;
  amplitude: number;
}

interface WaveSettingsProps {
  values: WaveSettingsValues;
  onChange: (values: WaveSettingsValues) => void;
}

export function WaveSettings({ values, onChange }: WaveSettingsProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="text-sm font-medium">Wave Settings</div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="wave-count" className="text-xs">
            Waves
          </Label>
          <span className="text-xs text-muted-foreground">{values.waveCount}</span>
        </div>
        <Slider
          id="wave-count"
          min={1}
          max={8}
          step={1}
          value={[values.waveCount]}
          onValueChange={([v]) => onChange({ ...values, waveCount: v })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="amplitude" className="text-xs">
            Amplitude
          </Label>
          <span className="text-xs text-muted-foreground">{values.amplitude}%</span>
        </div>
        <Slider
          id="amplitude"
          min={10}
          max={100}
          step={5}
          value={[values.amplitude]}
          onValueChange={([v]) => onChange({ ...values, amplitude: v })}
        />
      </div>
    </div>
  );
}

export const defaultWaveSettings: WaveSettingsValues = {
  waveCount: 4,
  amplitude: 60,
};
