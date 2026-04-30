'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { Card } from '@/components/ui/card';
import { User, Bell, Palette, Globe, Lock, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('Profile');

  const tabs = [
    { label: 'Profile', icon: User },
    { label: 'Notifications', icon: Bell },
    { label: 'Appearance', icon: Palette },
    { label: 'Localization', icon: Globe },
    { label: 'Security', icon: Lock },
    { label: 'Workflow Prefs', icon: Sliders },
  ];

  const [avatar, setAvatar] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <WorkspaceShell 
      title="User Settings" 
      eyebrow="Personalization" 
      subtitle="Customize your experience and manage notification preferences."
    >
      <div className="max-w-5xl space-y-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
          <aside className="space-y-1">
            {tabs.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === item.label 
                    ? "aurum-gradient text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={activeTab === item.label ? 2.5 : 2} />
                {item.label}
              </button>
            ))}
          </aside>

          <div className="space-y-6">
            <Card className="p-8 bg-card border-border shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black tracking-tight italic">Personal Profile</h4>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 p-4 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="h-20 w-20 rounded-full aurum-gradient flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary/20 ring-4 ring-background overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      "A"
                    )}
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleAvatarChange} 
                      className="hidden" 
                      accept="image/*" 
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fileInputRef.current?.click()}
                      className="h-9 px-4 rounded-xl font-bold uppercase tracking-widest"
                    >
                      Change Avatar
                    </Button>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Max size: 2MB. Format: JPG, PNG</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Full Name</label>
                    <input className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" value="Aurum Executive" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Title</label>
                    <input className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" value="Growth Architect" readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Email Address</label>
                  <input className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" value="executive@aurum.io" readOnly />
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border flex justify-end">
                <Button className="aurum-gradient text-white font-black h-11 px-10 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all uppercase tracking-widest text-[10px]">
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-rose-500/5 border-rose-500/10 group hover:border-rose-500/30 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-rose-500">Danger Zone</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-6">Irreversible actions that affect your workspace security and data history.</p>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/50 rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest transition-all">
                  Purge Storage Cache
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-rose-500 text-[10px] font-black uppercase tracking-widest">
                  Deactivate Account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}