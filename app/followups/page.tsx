import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { FollowupsWorkspace } from '@/components/workspaces/followups-workspace';

export default function FollowupsPage() {
  return (
    <WorkspaceShell
      title="Follow-up Center"
      eyebrow="Timeline and reminders"
      subtitle="Pending actions, overdue work, and scheduled reminders in a timeline-focused workspace."
    >
      <FollowupsWorkspace />
    </WorkspaceShell>
  );
}