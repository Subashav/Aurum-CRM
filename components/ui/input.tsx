import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

// Shared input keeps forms and search bars visually aligned.
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-border bg-muted/20 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 transition-all focus:border-primary/30 focus:bg-background',
        className
      )}
      {...props}
    />
  );
}