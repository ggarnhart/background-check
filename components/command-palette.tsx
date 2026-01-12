"use client"

import * as React from "react"
import { MessageCirclePlus, Download } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command-menu"

interface CommandPaletteProps {
  onSubmitIssue?: () => void
  onDownload?: () => void
}

export function CommandPalette({ onSubmitIssue, onDownload }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (callback?: () => void) => {
    setOpen(false)
    callback?.()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => handleSelect(onSubmitIssue)}>
            <MessageCirclePlus className="mr-2 h-4 w-4" />
            <span>Submit Issue</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(onDownload)}>
            <Download className="mr-2 h-4 w-4" />
            <span>Download 4K Wallpaper</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Keyboard Shortcuts">
          <CommandItem disabled>
            <span>Open Command Menu</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
