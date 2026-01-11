"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleThemeSelect = (selectedTheme: "light" | "dark" | "system") => {
    setTheme(selectedTheme);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Theme Settings</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid gap-2">
          <button
            onClick={() => handleThemeSelect("light")}
            className={`flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent ${
              theme === "light" ? "border-primary bg-accent" : ""
            }`}
          >
            <Sun className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Light</div>
              <div className="text-muted-foreground text-sm">Bright and clear</div>
            </div>
          </button>
          <button
            onClick={() => handleThemeSelect("dark")}
            className={`flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent ${
              theme === "dark" ? "border-primary bg-accent" : ""
            }`}
          >
            <Moon className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Dark</div>
              <div className="text-muted-foreground text-sm">Easy on the eyes</div>
            </div>
          </button>
          <button
            onClick={() => handleThemeSelect("system")}
            className={`flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent ${
              theme === "system" ? "border-primary bg-accent" : ""
            }`}
          >
            <Monitor className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">System</div>
              <div className="text-muted-foreground text-sm">Match your device</div>
            </div>
          </button>
        </div>
        <div className="text-muted-foreground text-center text-xs">
          Press <kbd className="bg-muted rounded px-1.5 py-0.5">⌘</kbd>
          <kbd className="bg-muted rounded px-1.5 py-0.5">K</kbd> to toggle
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
