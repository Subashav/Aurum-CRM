'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, Building2, LayoutGrid, Plus, X, Command, Settings2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLeadsStore } from '@/lib/store/leads';
import { useRouter } from 'next/navigation';
import { Lead } from '@/lib/crm-data';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { leads } = useLeadsStore();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const actions = [
    { label: 'Capture New Lead', icon: Plus, keywords: ['new', 'create', 'add', 'capture'], action: () => router.push('/leads?create=true') },
    { label: 'View Revenue Pipeline', icon: LayoutGrid, keywords: ['pipeline', 'kanban', 'sales'], action: () => router.push('/pipeline') },
    { label: 'Open Settings', icon: Settings2, keywords: ['settings', 'config', 'profile'], action: () => router.push('/settings') },
    { label: 'Terminate Session', icon: X, keywords: ['logout', 'sign out', 'exit'], action: () => { 
        toast.info('Terminating session...');
        setTimeout(() => router.push('/login'), 800);
      } 
    },
  ];

  const filteredActions = query.length < 2 
    ? [] 
    : actions.filter(a => 
        a.label.toLowerCase().includes(query.toLowerCase()) || 
        a.keywords.some(k => k.includes(query.toLowerCase()))
      );

  const filteredLeads = query.length < 2 
    ? [] 
    : leads.filter(l => 
        l.name.toLowerCase().includes(query.toLowerCase()) || 
        l.company.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={() => setIsOpen(false)} 
      />
      
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 px-4 border-b border-white/5 h-14">
          <Search className="h-4 w-4 text-white/30" />
          <input
            autoFocus
            placeholder="Search leads, companies, or actions (e.g. 'New Lead', 'Logout')..."
            className="flex-1 bg-transparent border-none text-white placeholder-white/20 text-sm focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/40 font-bold">ESC</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
          {query.length === 0 && (
            <div className="p-4 space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/20 px-2">Quick Access</p>
              <div className="grid grid-cols-1 gap-1">
                {actions.slice(0, 3).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { item.action(); setIsOpen(false); }}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 text-left text-sm text-white/70 hover:text-white transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                      <item.icon className="h-4 w-4" />
                    </div>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredActions.length > 0 && (
            <div className="p-2 space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/20 px-2">Actions</p>
              {filteredActions.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { item.action(); setIsOpen(false); }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 text-left text-sm text-white/70 hover:text-white transition-all group"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {filteredLeads.length > 0 && (
            <div className="p-2 space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/20 px-2">Prospects</p>
              {filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => {
                    router.push(`/leads/${lead.id}`);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/5 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-all">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-white/40">{lead.company}</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/30 uppercase font-bold">
                    {lead.stage}
                  </div>
                </button>
              ))}
            </div>
          )}

          {query.length >= 2 && filteredLeads.length === 0 && filteredActions.length === 0 && (
            <div className="p-8 text-center">
              <Search className="h-8 w-8 text-white/10 mx-auto mb-3" />
              <p className="text-sm text-white/40">No results found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 h-10 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[10px] text-white/20 font-medium">
              <Command className="h-3 w-3" />
              <span>Enter to select</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-white/20 font-medium">
              <span>↑↓ to navigate</span>
            </div>
          </div>
          <p className="text-[10px] text-white/10 font-black italic tracking-tighter">AURUM PRO V1.0</p>
        </div>
      </div>
    </div>
  );
}
