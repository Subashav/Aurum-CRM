"use client";

import React from 'react';
import { cn } from '@/lib/cn';
import { useLeadsStore } from '@/lib/store/leads';
import Link from 'next/link';
import { formatFollowUp } from '@/lib/utils-crm';
import { motion } from 'framer-motion';
import { MoreHorizontal, Plus, GripVertical, Clock, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const STAGES = ['New Lead', 'Initial Contact', 'Follow-up', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'] as const;

const PRIORITY_COLORS: Record<string, string> = {
  High: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  Medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  Low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Sales Pipeline</h3>
          <p className="text-sm text-muted-foreground">Manage and track deal progress across all conversion stages.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2 mr-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden shadow-sm">
                <div className="h-full w-full aurum-gradient opacity-20" />
              </div>
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">
              +12
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex gap-2">
            <Plus size={14} />
            New Deal
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide select-none px-2">
        {STAGES.map((stage, stageIndex) => (
          <div
            key={stage}
            className="flex-shrink-0 w-80 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold tracking-tight">{stage}</h4>
                <Badge variant="outline" className="text-[10px] bg-muted/50 border-none font-bold">
                  {leadsByStage[stage].length}
                </Badge>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <MoreHorizontal size={14} />
              </button>
            </div>

            <div className="flex-1 space-y-3 min-h-[500px] p-2 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 transition-all">
              {leadsByStage[stage].map((lead, leadIndex) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (stageIndex * 0.1) + (leadIndex * 0.05) }}
                >
                  <Link href={`/leads/${lead.id}`}>
                    <Card className="p-4 bg-card/60 hover:bg-card hover:border-primary/30 group relative shadow-sm hover:shadow-md transition-all border-border/60">
                      <div className="flex justify-between items-start mb-3">
                        <div className="min-w-0">
                          <p className="text-sm font-black group-hover:text-primary transition-colors tracking-tight">{lead.name}</p>
                          <p className="text-[11px] text-muted-foreground font-medium truncate">{lead.company}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Badge className={cn("text-[8px] font-black uppercase px-1.5 py-0", PRIORITY_COLORS[lead.priority])}>
                            {lead.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/40">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                          <Clock size={12} className="text-primary" />
                          {formatFollowUp(lead.followUpAt)}
                        </div>
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <ArrowUpRight size={10} className="group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}

              {leadsByStage[stage].length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground/20 border-2 border-dashed border-border/20 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest">No Active Deals</p>
                </div>
              )}
              
              <button className="w-full py-2 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border/40 text-muted-foreground/40 hover:text-primary/60 hover:border-primary/20 hover:bg-primary/5 transition-all group">
                <Plus size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Quick Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
