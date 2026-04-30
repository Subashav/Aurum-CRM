import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

// Small label used for status, source, and priority pills throughout the CRM.
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]', className)}
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--panel-strong)',
        color: 'var(--fg-color)'
      }}
    >
      {children}
    </span>
  );
}