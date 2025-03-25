'use client';

import * as React from 'react';
import { personalities } from '@/lib/gemini';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Brain } from 'lucide-react';

interface PersonalitySelectorProps {
  onSelect: (personality: string) => void;
  className?: string;
}

export function PersonalitySelector({ onSelect, className }: PersonalitySelectorProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = (key: string) => {
    setSelected(key);
    onSelect(key);
  };

  const triggerText = selected 
    ? personalities[selected as keyof typeof personalities]?.name 
    : 'choose personality';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 hover:text-neutral-400 font-mono border border-neutral-800 h-8 px-2 sm:px-3 whitespace-nowrap">
        <Brain className="h-4 w-4" />
        {triggerText}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-900 border border-neutral-800 min-w-[200px]">
        {Object.entries(personalities).map(([key, personality]) => (
          <DropdownMenuItem 
            key={key} 
            onClick={() => handleSelect(key)}
            className={cn(
              "text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800 font-mono text-xs sm:text-sm",
              selected === key && "text-neutral-200 bg-neutral-800"
            )}
          >
            {personality.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
