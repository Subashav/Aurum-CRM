'use client';

import { BellRing, Calendar, CalendarDays, Clock3, PhoneCall, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useLeadsStore } from '@/lib/store/leads';
import Link from 'next/link';

export function FollowupsWorkspace() {
  const { leads } = useLeadsStore();

  // Get leads that need follow-ups (sorted by follow-up date)
  const pendingFollowups = leads
    .filter((lead) => lead.followUpAt)
    .sort((a, b) => new Date(a.followUpAt).getTime() - new Date(b.followUpAt).getTime());

  const overdue = pendingFollowups.filter((lead) => new Date(lead.followUpAt) < new Date());
  const dueToday = pendingFollowups.filter(
    (lead) =>
      new Date(lead.followUpAt).toDateString() === new Date().toDateString()
  );
  const upcoming = pendingFollowups.filter((lead) => new Date(lead.followUpAt) > new Date());

  const markComplete = (id: string) => {
    alert(`Marked ${id} as completed!`);
  };

  return (
    <div className="space-y-6">
      <Card className="border border-white/10 bg-surface/90 p-6">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-2">Workspace / Follow-ups</p>
        <h3 className="text-3xl font-semibold text-white mb-2">Follow-up Center</h3>
        <p className="text-white/55">Manage and track all your pending follow-ups with timeline-based prioritization.</p>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 border border-red-500/30 bg-red-500/10">
          <p className="text-sm text-red-300 mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Overdue
          </p>
          <p className="text-3xl font-bold text-white">{overdue.length}</p>
          <p className="text-xs text-red-300/70 mt-1">Needs immediate action</p>
        </Card>

        <Card className="p-4 border border-amber-500/30 bg-amber-500/10">
          <p className="text-sm text-amber-300 mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Due Today
          </p>
          <p className="text-3xl font-bold text-white">{dueToday.length}</p>
          <p className="text-xs text-amber-300/70 mt-1">Schedule for today</p>
        </Card>

        <Card className="p-4 border border-blue-500/30 bg-blue-500/10">
          <p className="text-sm text-blue-300 mb-2 flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            Upcoming
          </p>
          <p className="text-3xl font-bold text-white">{upcoming.length}</p>
          <p className="text-xs text-blue-300/70 mt-1">Scheduled</p>
        </Card>
      </div>

      {/* Overdue */}
      {overdue.length > 0 && (
        <Card className="p-6 border border-red-500/20 bg-red-500/5">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            Overdue Follow-ups ({overdue.length})
          </h4>
          <div className="space-y-3">
            {overdue.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-red-500/20 hover:bg-white/10 transition"
              >
                <Link href={`/leads/${lead.id}`} className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-white/50">{lead.company} • {lead.role}</p>
                      <p className="text-xs text-red-400 mt-1">
                        Due: {new Date(lead.followUpAt).toDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => markComplete(lead.id)}
                  className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 text-sm font-medium hover:bg-red-500/30 transition"
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Due Today */}
      {dueToday.length > 0 && (
        <Card className="p-6 border border-amber-500/20 bg-amber-500/5">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            Due Today ({dueToday.length})
          </h4>
          <div className="space-y-3">
            {dueToday.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-amber-500/20 hover:bg-white/10 transition"
              >
                <Link href={`/leads/${lead.id}`} className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-white/50">{lead.company} • {lead.role}</p>
                      <Badge className="mt-2 text-xs bg-amber-500/20 border-amber-500/40 text-amber-300">
                        {lead.stage} • {lead.status}
                      </Badge>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => markComplete(lead.id)}
                  className="px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/30 transition"
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <Card className="p-6 border border-blue-500/20 bg-blue-500/5">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-blue-400" />
            Upcoming Follow-ups ({upcoming.length})
          </h4>
          <div className="space-y-3">
            {upcoming.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-blue-500/20 hover:bg-white/10 transition"
              >
                <Link href={`/leads/${lead.id}`} className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Clock3 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-white/50">{lead.company} • {lead.role}</p>
                      <p className="text-xs text-blue-400 mt-1">
                        Due: {new Date(lead.followUpAt).toDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
                <Badge className="text-xs bg-blue-500/20 border-blue-500/40 text-blue-300">
                  In {Math.ceil((new Date(lead.followUpAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                </Badge>
              </div>
            ))}
            {upcoming.length > 5 && (
              <p className="text-center text-sm text-white/50 py-2">
                +{upcoming.length - 5} more scheduled
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <BellRing className="h-5 w-5 text-white/60 mb-2" />
          <p className="text-sm font-medium text-white">Reminder automation</p>
          <p className="text-xs text-white/50 mt-1">Set up email & SMS reminders</p>
        </Card>

        <Card className="p-4">
          <PhoneCall className="h-5 w-5 text-white/60 mb-2" />
          <p className="text-sm font-medium text-white">Call logging</p>
          <p className="text-xs text-white/50 mt-1">Record all interactions</p>
        </Card>

        <Card className="p-4">
          <CalendarDays className="h-5 w-5 text-white/60 mb-2" />
          <p className="text-sm font-medium text-white">Calendar sync</p>
          <p className="text-xs text-white/50 mt-1">Sync with Google Calendar</p>
        </Card>
      </div>
    </div>
  );
}