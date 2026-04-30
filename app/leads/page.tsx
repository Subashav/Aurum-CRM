import { Suspense } from 'react';
import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { LeadsWorkspace } from '@/components/workspaces/leads-workspace';

export default function LeadsPage() {
  return (
    <WorkspaceShell
      title="Leads Workspace"
      eyebrow="Operational workspace"
      subtitle="Fast search, filtering, inline editing, and high-density table operations." 
    >
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-white/20">Loading workspace...</div>}>
        <LeadsWorkspace />
      </Suspense>
    </WorkspaceShell>
  );
}