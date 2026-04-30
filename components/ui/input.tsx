import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

// Shared input keeps forms and search bars visually aligned.
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn('h-11 w-full rounded-full border px-4 text-sm outline-none placeholder:text-muted transition-colors', className)}
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--border)',
        color: 'var(--fg-color)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
      }}
      {...props}
    />
  );
}