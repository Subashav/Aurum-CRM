import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

// Panel shell used for metrics, tables, and operational blocks.
export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn('glass-edge lift-on-hover rounded-xl p-4 backdrop-blur-xl', className)}
      style={{ backgroundColor: 'var(--panel)' }}
    >
      {children}
    </section>
  );
}