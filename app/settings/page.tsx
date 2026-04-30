'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { Card } from '@/components/ui/card';
import { User, Bell, Palette, Globe, Lock, Sliders, Check, Shield, Zap, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('Profile');
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const tabs = [
    { label: 'Profile', icon: User },
    { label: 'Notifications', icon: Bell },
    { label: 'Appearance', icon: Palette },
    { label: 'Security', icon: Lock },
    { label: 'Integrations', icon: Zap },
    { label: 'Localization', icon: Globe },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
      toast.success('Avatar updated successfully');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="p-8 bg-card border-border shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black tracking-tight italic">Personal Profile</h4>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6 p-4 rounded-2xl bg-muted/20 border border-border/50">
                  <div className="h-20 w-20 rounded-full aurum-gradient flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary/20 ring-4 ring-background overflow-hidden shrink-0">
                    {avatar ? <img src={avatar} alt="Avatar" className="h-full w-full object-cover" /> : "A"}
                  </div>
                  <div className="space-y-2">
                    <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="h-9 px-4 rounded-xl font-bold uppercase tracking-widest text-[10px]">Change Avatar</Button>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Max 2MB. JPG, PNG</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Full Name</label>
                    <input className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" defaultValue="Aurum Executive" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Title</label>
                    <input className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" defaultValue="Growth Architect" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Email Address</label>
                  <input className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" defaultValue="executive@aurum.io" />
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-border flex justify-end">
                <Button onClick={() => toast.success('Profile changes saved')} className="aurum-gradient text-white font-black h-11 px-10 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all uppercase tracking-widest text-[10px]">Save Changes</Button>
              </div>
            </Card>
            <Card className="p-8 bg-rose-500/5 border-rose-500/10 group hover:border-rose-500/30 transition-all">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-rose-500 mb-2">Danger Zone</h4>
              <p className="text-xs text-muted-foreground mb-6">Irreversible actions that affect your workspace security and data history.</p>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/50 rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest transition-all">Purge Storage Cache</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-rose-500 text-[10px] font-black uppercase tracking-widest">Deactivate Account</Button>
              </div>
            </Card>
          </div>
        );
      case 'Notifications':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="p-8 bg-card border-border">
              <h4 className="text-xl font-black tracking-tight italic mb-8">Notification Preferences</h4>
              <div className="space-y-6">
                {[
                  { title: 'Email Alerts', desc: 'Receive lead updates and daily revenue digests via email.', default: true },
                  { title: 'Push Notifications', desc: 'Real-time alerts for high-priority lead activity.', default: true },
                  { title: 'Weekly Reports', desc: 'A comprehensive summary of team performance and pipeline health.', default: false },
                  { title: 'Security Alerts', desc: 'Immediate notification of unusual account activity or login attempts.', default: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/40">
                    <div>
                      <p className="text-sm font-bold tracking-tight">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className={cn("h-6 w-11 rounded-full relative cursor-pointer transition-all", item.default ? "aurum-gradient" : "bg-muted border border-border")}>
                       <div className={cn("absolute top-1 h-4 w-4 rounded-full bg-white transition-all", item.default ? "right-1" : "left-1")} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      case 'Appearance':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="p-8 bg-card border-border">
              <h4 className="text-xl font-black tracking-tight italic mb-8">Appearance & Theme</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Light Mode', icon: Sun, desc: 'Clean and professional for day-time focus.', active: false },
                  { label: 'Dark Mode', icon: Moon, desc: 'Premium midnight aesthetics for reduced eye strain.', active: true },
                ].map((theme, i) => (
                  <button key={i} className={cn("p-6 rounded-2xl border text-left transition-all group", theme.active ? "border-primary bg-primary/5" : "border-border hover:bg-muted")}>
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-4 transition-colors", theme.active ? "aurum-gradient text-white" : "bg-muted text-muted-foreground group-hover:text-primary")}>
                       <theme.icon size={20} />
                    </div>
                    <p className="text-sm font-black uppercase tracking-widest mb-1">{theme.label}</p>
                    <p className="text-xs text-muted-foreground">{theme.desc}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        );
      case 'Security':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="p-8 bg-card border-border">
              <h4 className="text-xl font-black tracking-tight italic mb-8">Account Security</h4>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-border bg-muted/20 flex items-center gap-6">
                   <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <Shield size={24} />
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account by requiring more than just a password.</p>
                   </div>
                   <Button variant="outline" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Enable 2FA</Button>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Change Password</p>
                  <div className="grid grid-cols-1 gap-4">
                     <input type="password" placeholder="Current Password" className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm" />
                     <input type="password" placeholder="New Password" className="w-full bg-muted/20 border border-border rounded-xl px-4 py-3 text-sm" />
                     <Button className="w-full h-11 aurum-gradient text-white font-black rounded-xl uppercase tracking-widest text-[10px]">Update Password</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      case 'Integrations':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <Card className="p-8 bg-card border-border">
                <h4 className="text-xl font-black tracking-tight italic mb-8">App Integrations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                     { name: 'Slack', status: 'Connected', desc: 'Sync lead activity to Slack channels.', icon: 'https://cdn.brandfetch.io/slack.com/fallback/lettermark/theme/dark/h/512/w/512/v/6' },
                     { name: 'Google Calendar', status: 'Disconnected', desc: 'Sync follow-ups with your calendar.', icon: 'https://www.google.com/favicon.ico' },
                     { name: 'Hubspot', status: 'Disconnected', desc: 'Two-way sync with Hubspot CRM.', icon: 'https://cdn.brandfetch.io/hubspot.com/fallback/lettermark/theme/dark/h/512/w/512/v/6' },
                     { name: 'Stripe', status: 'Connected', desc: 'View revenue data directly in CRM.', icon: 'https://cdn.brandfetch.io/stripe.com/fallback/lettermark/theme/dark/h/512/w/512/v/6' },
                   ].map((app, i) => (
                     <div key={i} className="p-4 rounded-2xl border border-border hover:border-primary/20 transition-all flex items-center gap-4 group">
                        <div className="h-10 w-10 rounded-xl bg-muted p-2 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                           <img src={app.icon} className="h-full w-full object-contain" alt={app.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-bold">{app.name}</p>
                           <p className="text-[10px] text-muted-foreground truncate">{app.desc}</p>
                        </div>
                        <Badge variant={app.status === 'Connected' ? 'default' : 'outline'} className={cn(app.status === 'Connected' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20")}>
                           {app.status}
                        </Badge>
                     </div>
                   ))}
                </div>
             </Card>
          </div>
        );
      default:
        return (
          <div className="py-20 text-center animate-in fade-in duration-500">
             <Globe size={48} className="mx-auto text-muted-foreground/20 mb-4" />
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Workspace module coming soon</p>
          </div>
        );
    }
  };

  return (
    <WorkspaceShell 
      title="User Settings" 
      eyebrow="Personalization" 
      subtitle="Customize your experience and manage notification preferences."
    >
      <div className="max-w-6xl space-y-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
          <aside className="space-y-1">
            {tabs.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all group",
                  activeTab === item.label 
                    ? "aurum-gradient text-white shadow-xl shadow-primary/20 scale-[1.02]" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 transition-transform", activeTab === item.label ? "scale-110" : "group-hover:translate-x-1")} />
                {item.label}
              </button>
            ))}
          </aside>

          <main>
            {renderContent()}
          </main>
        </div>
      </div>
    </WorkspaceShell>
  );
}