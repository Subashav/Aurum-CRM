"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ActivitySquare, BarChart3, FolderKanban, Gauge, Settings2, ShieldCheck, Waypoints } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CommandPalette } from '@/components/navigation/command-palette';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Gauge },
  { href: '/leads', label: 'Leads', icon: FolderKanban },
  { href: '/pipeline', label: 'Pipeline', icon: Waypoints },
  { href: '/followups', label: 'Follow-ups', icon: ActivitySquare },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin', label: 'Admin', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings2 },
];

type WorkspaceShellProps = {
  title: string;
  eyebrow: string;
  subtitle: string;
  children: React.ReactNode;
};

// Shared CRM shell keeps navigation, status, and spatial rhythm consistent across workspaces.
export function WorkspaceShell({ title, eyebrow, subtitle, children }: WorkspaceShellProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div className="relative mx-auto flex min-h-screen w-full max-w-[1720px] gap-6 p-4 lg:p-6" initial="initial" animate="animate" variants={pageVariants}>
      <CommandPalette />
      <div className="ambient-orb a" aria-hidden="true" />
      <div className="ambient-orb b" aria-hidden="true" />
      <aside
        className="hidden w-[260px] shrink-0 xl:flex xl:flex-col"
        style={{ backgroundColor: 'var(--panel)', borderRadius: '1rem', padding: '12px', border: '1px solid var(--border)' }}
      >
        <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--panel-strong)' }}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Aurum CRM</p>
          <h1 className="mt-2 text-display text-2xl" style={{ color: 'var(--fg-color)' }}>{title}</h1>
          <p className="mt-3 text-sm leading-6" style={{ color: 'var(--muted)' }}>{subtitle}</p>
        </div>

        <nav className="mt-4 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors', active ? 'shadow-md' : 'hover:bg-[color:var(--panel-strong)]')}
                style={{
                  color: active ? 'var(--fg-color)' : 'var(--muted)'
                }}
              >
                {active ? <span style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 4, borderRadius: 4, background: 'linear-gradient(180deg,hsl(var(--accent)), rgba(255,255,255,0.02))' }} /> : null}
                <Icon className="h-4 w-4" />
                <span style={{ marginLeft: 6 }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto" style={{ marginTop: 12 }}>
          <div style={{ padding: 12, borderRadius: 10, border: '1px solid var(--border)', backgroundColor: 'transparent' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--fg-color)' }}>
              <ActivitySquare className="h-4 w-4" />
              <span>Workspace status</span>
            </div>
            <p className="mt-3 leading-6" style={{ color: 'var(--muted)' }}>Secure, role-aware, and ready for lead operations, follow-up workflows, and admin controls.</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <header
          className="relative overflow-hidden px-5 py-4"
          style={{ borderRadius: 16, border: '1px solid var(--border)', backgroundColor: 'var(--panel-strong)' }}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>{eyebrow}</p>
              <h2 className="mt-2 text-display text-2xl" style={{ color: 'var(--fg-color)' }}>{title}</h2>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ borderRadius: 9999, border: '1px solid rgba(0,0,0,0.06)', padding: '6px 10px', backgroundColor: 'var(--panel)' }}>Live</span>
              <span style={{ borderRadius: 8, border: '1px solid var(--border)', padding: '6px 10px', backgroundColor: 'transparent' }}>Realtime sync</span>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={`top-${item.href}`}
                  href={item.href}
                  className={cn('inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors')}
                  style={{
                    borderColor: 'var(--border)',
                    background: active ? 'linear-gradient(120deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' : 'transparent',
                    color: active ? 'var(--fg-color)' : 'var(--muted)'
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="min-w-0 flex-1">{children}</main>

        <nav className="sticky bottom-3 z-40 mx-auto flex w-full max-w-[760px] items-center justify-between gap-1 rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-atmosphere backdrop-blur-xl xl:hidden">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={`dock-${item.href}`}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  'flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] transition-colors',
                  active
                    ? 'bg-[linear-gradient(120deg,#fff7db_0%,#ffffff_62%,#dbeafe_100%)] text-black'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}