"use client";

import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { CRMMainDashboard } from '@/components/workspaces/crm-main';

export default function DashboardPage() {
  return (
    <WorkspaceShell
      title="Sales Dashboard"
      eyebrow="Revenue Operations"
      subtitle="Comprehensive view of your sales pipeline, high-priority leads, and performance metrics."
    >
      <CRMMainDashboard />
    </WorkspaceShell>
  );
}
