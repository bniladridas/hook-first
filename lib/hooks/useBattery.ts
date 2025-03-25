'use client';

import { useState, useEffect } from 'react';

interface BatteryStatus {
  level: number;
  charging: boolean;
}

export function useBattery() {
  const [battery, setBattery] = useState<BatteryStatus | null>(null);

  useEffect(() => {
    const checkBattery = async () => {
      try {
        // @ts-ignore - getBattery is not in Navigator type
        const manager = await navigator.getBattery?.();
        if (manager) {
          const updateBattery = () => {
            setBattery({
              level: Math.floor(manager.level * 100),
              charging: manager.charging
            });
          };

          updateBattery();
          manager.addEventListener('levelchange', updateBattery);
          manager.addEventListener('chargingchange', updateBattery);

          return () => {
            manager.removeEventListener('levelchange', updateBattery);
            manager.removeEventListener('chargingchange', updateBattery);
          };
        }
      } catch (e) {
        console.warn('Battery API not available');
      }
    };

    checkBattery();
  }, []);

  return { battery };
}
