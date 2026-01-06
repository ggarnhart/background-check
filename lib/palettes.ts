export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

export const palettes: ColorPalette[] = [
  {
    id: "retro-sunset",
    name: "Retro Sunset",
    colors: [
      "#003340",
      "#004E5A",
      "#00706C",
      "#EDDB9D",
      "#F58D49",
      "#F06E3E",
      "#DE4C39",
      "#C83641",
    ],
  },
  {
    id: "molten",
    name: "Molten Lava",
    colors: ["#780000", "#c1121f", "#fdf0d5", "#003049", "#669bbc"],
  },
  {
    id: "forest",
    name: "Forest",
    colors: ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"],
  },
  {
    id: "twilight",
    name: "Deep Twilight",
    colors: [
      "#03045e",
      "#023e8a",
      "#0077b6",
      "#0096c7",
      "#00b4d8",
      "#48cae4",
      "#90e0ef",
      "#ade8f4",
      "#caf0f8",
    ],
  },
  {
    id: "slate",
    name: "Slate & Teal",
    colors: ["#cad2c5", "#84a98c", "#52796f", "#354f52", "#2f3e46"],
  },
];

export function getPaletteById(id: string): ColorPalette | undefined {
  return palettes.find((p) => p.id === id);
}
