import React from 'react';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className, iconOnly = false, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { box: 'h-6 w-6 rounded-md', text: 'text-base', icon: 'text-sm' },
    md: { box: 'h-8 w-8 rounded-lg', text: 'text-lg', icon: 'text-xl' },
    lg: { box: 'h-9 w-9 rounded-lg', text: 'text-xl', icon: 'text-2xl' },
    xl: { box: 'h-12 w-12 rounded-xl', text: 'text-3xl', icon: 'text-4xl' },
  };

  const config = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <div className={cn(
        "aurum-gradient flex items-center justify-center shadow-lg shadow-primary/20 shrink-0",
        config.box
      )}>
        <span className={cn("text-white font-black italic", config.icon)}>A</span>
      </div>
      {!iconOnly && (
        <span className={cn(
          "font-bold tracking-tight aurum-text-gradient",
          config.text
        )}>
          Aurum
        </span>
      )}
    </div>
  );
}
