'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { Card } from '@/components/ui/card';
import { Shield, Users, Key, Database, Globe, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <WorkspaceShell 
      title="System Administration" 
      eyebrow="Root Access" 
      subtitle="Configure platform-wide security, user access, and data synchronization."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'User Management', desc: 'Manage access levels, roles, and seat allocation.', icon: Users },
          { title: 'Security & Auth', desc: 'SSO configuration, MFA enforcement, and token rotation.', icon: Key },
          { title: 'Data Pipeline', desc: 'Manage CSV imports, API keys, and external syncs.', icon: Database },
          { title: 'Global Localization', desc: 'Currency defaults, timezone mapping, and language.', icon: Globe },
          { title: 'System Alerts', desc: 'Threshold-based notifications and escalation rules.', icon: Bell },
          { title: 'Platform Logs', desc: 'Audit trails and system-wide activity logs.', icon: Shield },
        ].map((item, i) => (
          <Card key={i} className="p-6 bg-white/5 border-white/10 glass-edge group hover:bg-white/[0.08] transition-all">
            <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 mb-4 group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
              <item.icon className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white mb-2">{item.title}</h4>
            <p className="text-xs text-white/40 leading-relaxed mb-4">{item.desc}</p>
            <Button variant="outline" className="w-full border-white/10 text-white/60 hover:text-white h-9 text-[10px] font-bold uppercase tracking-widest">
              Configure
            </Button>
          </Card>
        ))}
      </div>
    </WorkspaceShell>
  );
}