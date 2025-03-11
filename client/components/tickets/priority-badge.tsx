"use client";

import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, BadgeAlert as Alert, Info } from 'lucide-react';

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = {
    urgent: {
      icon: AlertTriangle,
      className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    },
    high: {
      icon: AlertCircle,
      className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    },
    medium: {
      icon: Alert,
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    },
    low: {
      icon: Info,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    },
  };

  const { icon: Icon, className } = config[priority];

  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${className}`}>
      <Icon className="h-3 w-3" />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}