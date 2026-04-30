'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { Card } from '@/components/ui/card';
import { User, Bell, Palette, Globe, Lock, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <WorkspaceShell 
      title="User Settings" 
      eyebrow="Personalization" 
      subtitle="Customize your experience and manage notification preferences."
    >
      <div className="max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-1">
            {[
              { label: 'Profile', icon: User, active: true },
              { label: 'Notifications', icon: Bell },
              { label: 'Appearance', icon: Palette },
              { label: 'Localization', icon: Globe },
              { label: 'Security', icon: Lock },
              { label: 'Workflow Prefs', icon: Sliders },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  item.active ? 'bg-amber-500 text-black font-bold' : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </aside>

          <div className="space-y-6">
            <Card className="p-8 bg-white/5 border-white/10 glass-edge">
              <h4 className="text-xl font-bold text-white mb-8">Personal Profile</h4>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-amber-500 flex items-center justify-center text-4xl font-black text-black shadow-2xl shadow-amber-500/20">
                    Y
                  </div>
                  <Button variant="outline" className="border-white/10 text-white/70 hover:text-white">
                    Change Avatar
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" value="You" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Title</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" value="Senior Growth Executive" readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" value="executive@aurum.pro" readOnly />
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <Button className="bg-amber-500 text-black font-bold h-11 px-8 rounded-xl hover:bg-amber-400">
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-rose-500/5 border-rose-500/10">
              <h4 className="text-lg font-bold text-rose-300 mb-2">Danger Zone</h4>
              <p className="text-xs text-rose-300/50 mb-6">Irreversible actions that affect your workspace and data history.</p>
              <Button variant="outline" className="border-rose-500/20 text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/50">
                Purge Local Storage Cache
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}