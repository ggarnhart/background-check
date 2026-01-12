"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getCustomPalette, saveCustomPalette, deleteCustomPalette } from "@/lib/palettes";

interface CustomPaletteEditorProps {
  onSave: () => void;
  onClose: () => void;
}

export function CustomPaletteEditor({ onSave, onClose }: CustomPaletteEditorProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("#000000");

  useEffect(() => {
    const customPalette = getCustomPalette();
    if (customPalette) {
      setColors(customPalette.colors);
    }
  }, []);

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      const newColors = [...colors, newColor];
      setColors(newColors);
      saveCustomPalette(newColors);
    }
  };

  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    if (newColors.length > 0) {
      saveCustomPalette(newColors);
    } else {
      deleteCustomPalette();
    }
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
    saveCustomPalette(newColors);
  };

  const handleSave = () => {
    if (colors.length > 0) {
      saveCustomPalette(colors);
      onSave();
    }
  };

  const handleDelete = () => {
    deleteCustomPalette();
    setColors([]);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Custom Palette</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Add your own colors to create a custom palette. Colors are saved in your browser.
        </p>

        <div className="mb-4 space-y-2">
          {colors.map((color, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border"
              />
              <Input
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeColor(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded border"
          />
          <Input
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="#000000"
            className="flex-1 font-mono text-sm"
          />
          <Button onClick={addColor} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1" disabled={colors.length === 0}>
            Save Palette
          </Button>
          {colors.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Custom Palette?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your custom palette from this browser.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
