"use client";

import React from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
}

export function Card({ children, className, variant = 'default', ...props }: CardProps) {
  const variants = {
    default: 'bg-card border-border shadow-sm',
    glass: 'bg-card/40 backdrop-blur-md border-border/50 shadow-md',
    outline: 'bg-transparent border-border/60 hover:border-primary/20 transition-colors',
  };

  return (
    <div
      className={cn(
        'rounded-xl border p-6 transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}