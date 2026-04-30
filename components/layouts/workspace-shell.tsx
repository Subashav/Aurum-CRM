"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  FolderKanban, 
  Gauge, 
  Settings2, 
  ShieldCheck, 
  Waypoints,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { CommandPalette } from '@/components/navigation/command-palette';

const navItems = [
  { group: "Overview", items: [
    { href: '/', label: 'Dashboard', icon: Gauge },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ]},
  { group: "Operations", items: [
    { href: '/leads', label: 'Leads', icon: FolderKanban },
    { href: '/pipeline', label: 'Pipeline', icon: Waypoints },
  ]},
  { group: "Management", items: [
    { href: '/admin', label: 'Admin', icon: ShieldCheck },
    { href: '/settings', label: 'Settings', icon: Settings2 },
  ]}
];

export function WorkspaceShell({ 
  title, 
  children,
  subtitle,
  eyebrow 
}: { 
  title: string; 
  children: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <CommandPalette />
      
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 70 : 260 }}
        className="hidden border-r border-border bg-card/30 backdrop-blur-xl lg:flex flex-col relative z-50 transition-all duration-300 ease-in-out"
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-lg aurum-gradient flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-black text-xl italic">A</span>
                </div>
                <span className="font-bold tracking-tight text-lg aurum-text-gradient">AurumCRM</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide">
          {navItems.map((group) => (
            <div key={group.group} className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                  {group.group}
                </h3>
              )}
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200 group relative",
                    isActive(item.href) 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon size={isCollapsed ? 20 : 18} strokeWidth={isActive(item.href) ? 2.5 : 2} className="shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-4 bg-primary rounded-r-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border space-y-4">
          <ThemeToggle />
          {!isCollapsed && (
            <div className="flex items-center gap-3 px-2 py-2 group cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-muted border border-border overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                <div className="h-full w-full aurum-gradient opacity-20" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate uppercase tracking-widest">Admin User</p>
                <p className="text-[10px] text-muted-foreground truncate">admin@aurum.io</p>
              </div>
              <LogOut size={14} className="text-muted-foreground hover:text-destructive transition-colors" />
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 border-b border-border bg-background/60 backdrop-blur-md flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold tracking-tight text-muted-foreground">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <input 
                placeholder="Quick search (⌘K)" 
                className="h-9 w-64 bg-muted/50 border border-border rounded-full pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
              />
            </div>
            <button className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors relative">
              <Bell size={18} className="text-muted-foreground" />
              <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-primary border-2 border-background" />
            </button>
            <button className="h-9 px-4 rounded-full aurum-gradient text-white text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2">
              <Plus size={16} />
              New Lead
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide bg-muted/20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-[1400px] mx-auto w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border px-6 flex items-center justify-between z-[60] backdrop-blur-xl bg-background/80">
        {navItems.flatMap(g => g.items).slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href} className={cn(
            "p-2 rounded-xl flex flex-col items-center gap-1",
            isActive(item.href) ? "text-primary" : "text-muted-foreground"
          )}>
            <item.icon size={20} strokeWidth={isActive(item.href) ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}