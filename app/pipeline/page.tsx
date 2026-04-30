'use client';

import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { PipelineKanban } from '@/components/workspaces/pipeline-kanban';

export default function PipelinePage() {
  return (
    <WorkspaceShell
      title="Sales Pipeline"
      eyebrow="Pipeline / Kanban Board"
      subtitle="Manage your deals through each stage of the sales process"
    >
      <div className="space-y-6">
        <PipelineKanban />
      </div>
    </WorkspaceShell>
  );
}
