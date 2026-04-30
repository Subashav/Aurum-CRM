import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';

type BadgeProps = PropsWithChildren<{
  className?: string;
  variant?: 'default' | 'outline';
}>;

// Small label used for status, source, and priority pills throughout the CRM.
export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-all',
        variant === 'outline' ? 'border-border bg-transparent text-muted-foreground' : 'border-primary/20 bg-primary/10 text-primary',
        className
      )}
    >
      {children}
    </span>
  );
}