"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templates } from "@/lib/templates";

interface TemplateSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TemplateSelector({ value, onValueChange }: TemplateSelectorProps) {
  const selectedTemplate = templates.find((t) => t.id === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          {selectedTemplate?.name ?? "Select template"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {templates.map((template) => (
          <SelectItem key={template.id} value={template.id}>
            <div className="flex flex-col">
              <span>{template.name}</span>
              <span className="text-muted-foreground text-xs">{template.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
