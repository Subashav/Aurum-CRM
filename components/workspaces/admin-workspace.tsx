import { BadgeCheck, Layers3, LockKeyhole, Settings2, Workflow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function AdminWorkspace() {
  const items = [
    ['Users', 'Invite, disable, and review access'],
    ['Roles', 'Admin, manager, executive, viewer'],
    ['Pipelines', 'Stages, colors, and automation'],
    ['Integrations', 'WhatsApp, Gmail, Google Sheets'],
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Admin workspace</p>
            <h3 className="mt-1 text-xl text-white">System controls</h3>
          </div>
          <Badge>Secure controls</Badge>
        </div>

        <div className="mt-5 space-y-3">
          {items.map(([title, detail]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <p className="text-sm text-white">{title}</p>
              <p className="mt-1 text-sm text-white/55">{detail}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4 p-5">
        <div className="flex items-center gap-2 text-white/70"><LockKeyhole className="h-4 w-4" />Permissions</div>
        <div className="flex items-center gap-2 text-white/70"><Workflow className="h-4 w-4" />Automation rules</div>
        <div className="flex items-center gap-2 text-white/70"><Layers3 className="h-4 w-4" />Branding</div>
        <div className="flex items-center gap-2 text-white/70"><Settings2 className="h-4 w-4" />CRM settings</div>
        <div className="flex items-center gap-2 text-white/70"><BadgeCheck className="h-4 w-4" />Audit readiness</div>
      </Card>
    </div>
  );
}