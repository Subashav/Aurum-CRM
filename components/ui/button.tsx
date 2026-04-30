import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

// Unified button styles keep actions consistent across the control surface.
export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const styles = {
    primary: 'text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] hover:brightness-105',
    secondary: 'border text-inherit bg-transparent hover:bg-[color:var(--panel-strong)]',
    ghost: 'bg-transparent text-inherit hover:bg-[color:var(--panel-strong)]',
  }[variant];

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]'
        ,
        styles,
        className,
      )}
      style={
        variant === 'primary'
          ? { background: 'linear-gradient(120deg, hsl(var(--accent)) 0%, rgba(255,255,255,0.04) 100%)' }
          : undefined
      }
      {...props}
    />
  );
}