"use client";

import { useTheme } from '@/components/providers/theme-provider';
import { Moon, Sun, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
      {[
        { id: 'light', icon: Sun },
        { id: 'dark', icon: Moon },
        { id: 'system', icon: Monitor },
      ].map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id as any)}
          className="relative flex h-7 w-7 items-center justify-center rounded-full transition-colors"
          title={`${id.charAt(0).toUpperCase()}${id.slice(1)} mode`}
        >
          {theme === id && (
            <motion.div
              layoutId="theme-active"
              className="absolute inset-0 rounded-full bg-background shadow-sm"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Icon className={`relative z-10 h-3.5 w-3.5 ${theme === id ? 'text-foreground' : 'text-muted-foreground'}`} />
        </button>
      ))}
    </div>
  );
}
