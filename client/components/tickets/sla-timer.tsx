"use client";

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';
import type { Ticket, SLAConfig } from '@/app/types';

const SLA_CONFIGS: Record<string, SLAConfig> = {
  urgent: { priority: 'urgent', responseTime: 30, resolutionTime: 240 }, // 30min, 4h
  high: { priority: 'high', responseTime: 60, resolutionTime: 480 }, // 1h, 8h
  medium: { priority: 'medium', responseTime: 120, resolutionTime: 1440 }, // 2h, 24h
  low: { priority: 'low', responseTime: 240, resolutionTime: 2880 }, // 4h, 48h
};

interface SLATimerProps {
  ticket: Ticket;
}

export default function SLATimer({ ticket }: SLATimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [breached, setBreached] = useState<boolean>(false);

  useEffect(() => {
    const slaConfig = SLA_CONFIGS[ticket.priority];
    if (!slaConfig) return;

    const targetTime = new Date(ticket.createdAt);
    targetTime.setMinutes(targetTime.getMinutes() + slaConfig.resolutionTime);

    const updateTimer = () => {
      const now = new Date();
      const remaining = targetTime.getTime() - now.getTime();
      const total = slaConfig.resolutionTime * 60 * 1000;
      const elapsed = total - remaining;
      const progressValue = (elapsed / total) * 100;

      setTimeRemaining(Math.max(0, remaining));
      setProgress(Math.min(100, progressValue));
      setBreached(remaining <= 0);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">SLA Timer</span>
        </div>
        {breached ? (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            SLA Breached
          </Badge>
        ) : (
          <Badge variant="outline">{formatTime(timeRemaining)}</Badge>
        )}
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}