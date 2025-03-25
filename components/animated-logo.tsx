'use client';

import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className={cn('relative group w-8 h-8', className)}>
      {/* Outer glowing ring */}
      <div className="absolute inset-[-30%] rounded-full animate-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-white/20 blur-2xl opacity-40" />
      </div>

      {/* Inner rotating ring */}
      <div className="absolute inset-[-15%] animate-spin-slow">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/40 via-white/30 to-white/40 blur-md opacity-60" />
      </div>

      {/* Pulsing middle layer */}
      <div className="absolute inset-[-10%] rounded-full animate-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-white/20 blur-md opacity-50" />
      </div>

      {/* Camera icon container with subtle border glow */}
      <div className="absolute inset-0 rounded-full overflow-hidden bg-background/5 border border-white/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5" />
        <Camera className="w-5 h-5 text-white relative z-10" strokeWidth={1.5} />
      </div>
    </div>
  );
}
