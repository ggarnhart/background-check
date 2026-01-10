import type p5 from "p5";
import type paper from "paper";

// Paper.js scope type
export type PaperScope = typeof paper;

// Wave settings for Paper.js wave templates
export interface WaveSettings {
  waveCount: number;
  amplitude: number;
}

// Base template properties
interface BaseTemplate {
  id: string;
  name: string;
  description: string;
}

// p5.js template
export interface P5Template extends BaseTemplate {
  renderer: "p5";
  draw: (g: p5.Graphics, colors: string[]) => void;
}

// Paper.js template
export interface PaperTemplate extends BaseTemplate {
  renderer: "paper";
  supportsWaveSettings?: boolean;
  draw: (
    scope: PaperScope,
    width: number,
    height: number,
    colors: string[],
    waveSettings?: WaveSettings
  ) => void;
}

// Union type for all templates
export type WallpaperTemplate = P5Template | PaperTemplate;

// Type guards
export function isP5Template(template: WallpaperTemplate): template is P5Template {
  return template.renderer === "p5";
}

export function isPaperTemplate(template: WallpaperTemplate): template is PaperTemplate {
  return template.renderer === "paper";
}
