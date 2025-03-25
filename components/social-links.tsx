'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <a 
        href="https://x.com/bniladridas" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-neutral-500 hover:text-neutral-400 transition-colors"
      >
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-neutral-500 hover:text-neutral-400 font-mono text-sm border border-neutral-800 p-2 h-auto"
        >
          <img 
            src="https://cdn.brandfetch.io/idS5WhqBbM/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" 
            alt="X (Twitter)" 
            className="h-4 w-4"
          />
        </Button>
      </a>
    </div>
  );
}