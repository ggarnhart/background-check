export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

const CUSTOM_PALETTE_KEY = 'backgroundcheck-custom-palette';

export const palettes: ColorPalette[] = [
  {
    id: "macos-waves",
    name: "macOS Waves",
    colors: [
      "#E8F1FB", // Light blue-white background
      "#D35400", // Deep orange
      "#E67E22", // Bright orange
      "#F5B041", // Light orange
      "#1A5276", // Dark blue
      "#2874A6", // Medium blue
      "#5DADE2", // Sky blue
      "#85C1E9", // Light blue
    ],
  },
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
  if (id === 'custom') {
    return getCustomPalette();
  }
  return palettes.find((p) => p.id === id);
}

export function getCustomPalette(): ColorPalette | undefined {
  if (typeof window === 'undefined') return undefined;

  try {
    const stored = localStorage.getItem(CUSTOM_PALETTE_KEY);
    if (stored) {
      const colors = JSON.parse(stored);
      if (Array.isArray(colors) && colors.length > 0) {
        return {
          id: 'custom',
          name: 'Custom Palette',
          colors,
        };
      }
    }
  } catch (error) {
    console.error('Failed to load custom palette:', error);
  }

  return undefined;
}

export function saveCustomPalette(colors: string[]): void {
  if (typeof window === 'undefined') return;

  // Enforce minimum of 3 colors
  if (colors.length < 3) {
    console.warn('Custom palette must have at least 3 colors');
    return;
  }

  try {
    localStorage.setItem(CUSTOM_PALETTE_KEY, JSON.stringify(colors));
  } catch (error) {
    console.error('Failed to save custom palette:', error);
  }
}

export function deleteCustomPalette(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(CUSTOM_PALETTE_KEY);
  } catch (error) {
    console.error('Failed to delete custom palette:', error);
  }
}
