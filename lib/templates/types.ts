import type p5 from "p5";

export interface WallpaperTemplate {
  id: string;
  name: string;
  description: string;
  draw: (g: p5.Graphics, colors: string[]) => void;
}
