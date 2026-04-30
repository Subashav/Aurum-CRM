'use client';

import React from 'react';
import { useLeadsStore } from '@/lib/store/leads';
import Link from 'next/link';
import { formatFollowUp } from '@/lib/utils-crm';

const STAGES = ['New Lead', 'Initial Contact', 'Follow-up', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'] as const;

const STAGE_COLORS: Record<string, string> = {
  'New Lead': 'bg-blue-500/20 border-blue-500/50',
  'Initial Contact': 'bg-purple-500/20 border-purple-500/50',
  'Follow-up': 'bg-yellow-500/20 border-yellow-500/50',
  'Qualified': 'bg-sky-500/20 border-sky-500/50',
  'Proposal Sent': 'bg-indigo-500/20 border-indigo-500/50',
  'Negotiation': 'bg-orange-500/20 border-orange-500/50',
  'Converted': 'bg-green-500/20 border-green-500/50',
  'Lost': 'bg-red-500/20 border-red-500/50',
};

const PRIORITY_COLORS: Record<string, string> = {
  High: 'bg-red-500/30',
  Medium: 'bg-yellow-500/30',
  Low: 'bg-green-500/30',
};

export function PipelineKanban() {
  const { leads } = useLeadsStore();

  const leadsByStage = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = leads.filter((lead) => lead.stage === stage);
      return acc;
    },
    {} as Record<string, typeof leads>
  );



  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Prospect Pipeline</h3>
          <p className="text-sm text-white/40">Monitor movement across all conversion stages.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-white/30">Total active</span>
            <span className="text-lg font-bold text-white">{leads.length}</span>
          </div>
        </div>
      </div>

      {/* Kanban Board - Scrollable horizontal container */}
      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="flex-shrink-0 w-80 bg-white/[0.02] rounded-2xl border border-white/5 p-4 flex flex-col"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">{stage}</h4>
                <p className="text-[10px] uppercase tracking-tighter text-white/30">
                  {leadsByStage[stage].length} leads
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-4 flex-1">
              {leadsByStage[stage].map((lead) => (
                <Link
                  key={lead.id}
                  href={`/leads/${lead.id}`}
                  className={`group block p-4 rounded-xl border border-white/10 bg-white/5 transition-all hover:border-amber-500/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-amber-500/10 ${STAGE_COLORS[stage]}`}
                >
                  <div className="mb-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">{lead.name}</p>
                        <p className="text-[11px] text-white/40 truncate">{lead.company}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${PRIORITY_COLORS[lead.priority]} text-white`}>
                        {lead.priority}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-end">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                      <span className="h-1 w-1 rounded-full bg-amber-400" />
                      {formatFollowUp(lead.followUpAt)}
                    </div>
                  </div>
                </Link>
              ))}

              {leadsByStage[stage].length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center text-white/10 border-2 border-dashed border-white/[0.02] rounded-xl">
                  <p className="text-xs font-medium">Empty Stage</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
