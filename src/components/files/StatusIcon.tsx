import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatusIconProps {
  status: string;
  className?: string;
}

export function StatusIcon({ status, className = "w-5 h-5" }: StatusIconProps) {
  switch (status) {
    case 'completed':
      return <CheckCircle className={`${className} text-green-500`} />;
    case 'failed':
      return <XCircle className={`${className} text-red-500`} />;
    default:
      return <Clock className={`${className} text-yellow-500 animate-spin`} />;
  }
}