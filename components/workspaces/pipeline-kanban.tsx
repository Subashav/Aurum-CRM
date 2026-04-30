"use client";

import React from 'react';
import { cn } from '@/lib/cn';
import { useLeadsStore } from '@/lib/store/leads';
import Link from 'next/link';
import { formatFollowUp } from '@/lib/utils-crm';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Plus, GripVertical, Clock, ArrowUpRight, SortAsc, SortDesc, Calendar, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const STAGES = ['New Lead', 'Initial Contact', 'Follow-up', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'] as const;

const PRIORITY_COLORS: Record<string, string> = {
  High: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  Medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  Low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
};

/**
 * PipelineKanban Component
 * 
 * Provides a drag-and-drop style Kanban board for visualizing the sales pipeline.
 * Leads are grouped by their current stage and sorted based on the global sort configuration.
 */
export function PipelineKanban() {
  // Access global leads state and sort utilities
  const { getSortedLeads, sortBy, sortOrder, setSortConfig } = useLeadsStore();
  const sortedLeads = getSortedLeads();

  // Group leads into stages for column rendering
  const leadsByStage = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = sortedLeads.filter((lead) => lead.stage === stage);
      return acc;
    },
    {} as Record<string, typeof sortedLeads>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Sales Pipeline</h3>
          <p className="text-sm text-muted-foreground">Manage and track deal progress across all conversion stages.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (sortBy === 'createdAt') {
                setSortConfig('followUpAt', 'desc');
              } else if (sortBy === 'followUpAt' && sortOrder === 'desc') {
                setSortConfig('followUpAt', 'asc');
              } else {
                setSortConfig('createdAt', 'desc');
              }
            }}
            className="gap-2 h-8 font-bold text-[10px] uppercase tracking-wider bg-muted/50 border-border/40 hover:bg-muted min-w-[140px]"
          >
            {sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />}
            {sortBy === 'createdAt' ? 'Date Added' : 'Calendar'}: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
          </Button>

          <Button variant="outline" size="sm" className="hidden md:flex gap-2 h-8 aurum-gradient text-white border-none hover:opacity-90 shadow-sm">
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
              <AnimatePresence mode="popLayout">
                {leadsByStage[stage].map((lead, leadIndex) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: leadIndex * 0.05 
                    }}
                  >
                    <Link href={`/leads/${lead.id}`}>
                      <Card className="p-4 bg-card/60 hover:bg-card hover:border-primary/30 group relative shadow-sm hover:shadow-md transition-all border-border/60 overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full aurum-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
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
                            <Calendar size={12} className="text-primary" />
                            {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <ArrowUpRight size={10} className="group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>

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
