import React, { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'default' | 'icon';
  asChild?: boolean;
};

// Unified button styles keep actions consistent across the control surface.
export function Button({ className, variant = 'primary', size = 'default', ...props }: ButtonProps) {
  const styles = {
    primary: 'text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] hover:brightness-105',
    secondary: 'border text-inherit bg-transparent hover:bg-[color:var(--panel-strong)]',
    ghost: 'bg-transparent text-inherit hover:bg-[color:var(--panel-strong)]',
    outline: 'border border-white/10 bg-transparent text-inherit hover:bg-white/5',
  }[variant];

  if (props.asChild && React.isValidElement(props.children)) {
    const child = React.Children.only(props.children) as any;
    return React.cloneElement(child, {
      className: cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
        size === 'default' ? 'px-4 py-2 text-sm font-semibold' : 'h-10 w-10',
        styles,
        className,
        child.props?.className
      ),
      ...props,
      children: child.props?.children,
    } as any);
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
        size === 'default' ? 'px-4 py-2 text-sm font-semibold' : 'h-10 w-10',
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