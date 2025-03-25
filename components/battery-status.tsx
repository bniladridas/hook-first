'use client';

import { useEffect, useState } from 'react';
import { useBattery } from '@/lib/hooks/useBattery';
import { Battery, BatteryCharging, BatteryWarning } from 'lucide-react';

export function BatteryStatus() {
  const { battery } = useBattery();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only check for client-side hydration
  if (!isClient) return null;

  // If we can't get battery info, show a basic battery icon
  if (!battery) {
    return (
      <div className="flex items-center gap-2 text-sm font-mono">
        <span className="flex items-center gap-1 text-neutral-500">
          <Battery className="h-4 w-4" />
        </span>
      </div>
    );
  }

  const getBatteryColor = (level: number) => {
    if (level <= 20) return 'text-red-500';
    if (level <= 40) return 'text-orange-500';
    return 'text-green-500';
  };

  const getBatteryIcon = () => {
    if (battery.charging) return <BatteryCharging className="h-4 w-4" />;
    if (battery.level <= 20) return <BatteryWarning className="h-4 w-4" />;
    return <Battery className="h-4 w-4" />;
  };

  return (
    <div className="flex items-center gap-2 text-sm font-mono">
      <span className={`flex items-center gap-1 ${getBatteryColor(battery.level)}`}>
        {getBatteryIcon()}
        {battery.level}%
      </span>
      {battery.charging && (
        <span className="text-neutral-500">(charging)</span>
      )}
    </div>
  );
}
