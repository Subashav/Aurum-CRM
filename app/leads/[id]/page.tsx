"use client";

import React, { use, useState } from 'react';
import Link from 'next/link';

import { 
  ArrowLeft, 
  CalendarDays, 
  Mail, 
  MessageCircleMore, 
  PhoneCall, 
  Paperclip, 
  UserRound, 
  Workflow,
  Plus,
  Send,
  History
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { useLeadsStore } from '@/lib/store/leads';
import { toast } from 'sonner';

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = use(params);
  const { leads, leadDetails, updateLead, addActivity } = useLeadsStore();
  const [noteText, setNoteText] = useState('');

  const lead = leads.find(l => l.id === id);
  const details = leadDetails[id];

  if (!lead || !details) {
    return (
      <WorkspaceShell title="Not Found" eyebrow="Error" subtitle="Lead not found">
        <div className="flex h-[400px] items-center justify-center">
          <Button variant="outline" asChild>
            <Link href="/leads">Back to Leads</Link>
          </Button>
        </div>
      </WorkspaceShell>
    );
  }

  const completion = Math.max(20, 100 - (lead.missingFields?.length || 0) * 18);

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addActivity(id, {
      title: 'Note added',
      detail: noteText,
      kind: 'note'
    });
    setNoteText('');
    toast.success('Internal note recorded');
  };

  const handleStatusChange = (newStatus: any) => {
    updateLead(id, { status: newStatus });
    toast.info(`Status updated to ${newStatus}`);
  };

  const handleStageChange = (newStage: any) => {
    updateLead(id, { stage: newStage });
    toast.info(`Moved to ${newStage}`);
  };

  const logCommunication = (kind: string) => {
    addActivity(id, {
      title: `${kind} initiated`,
      detail: `Started ${kind.toLowerCase()} communication with lead.`,
      kind: 'communication'
    });
  };

  return (
    <WorkspaceShell
      title={lead.name}
      eyebrow="Lead detail workspace"
      subtitle={`${lead.company} · ${lead.stage} · ${lead.status}`}
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card className="p-6 glass-edge">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase tracking-wider text-[10px]">
                    {lead.priority} Priority
                  </Badge>
                  
                  <select
                    value={lead.stage}
                    onChange={(e) => handleStageChange(e.target.value)}
                    className="bg-white/5 border border-white/10 text-white/70 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-amber-500/50 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {['New Lead', 'Initial Contact', 'Follow-up', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'].map(s => (
                      <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>
                    ))}
                  </select>

                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="bg-white/5 border border-white/10 text-white/70 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-amber-500/50 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {['New', 'Contacted', 'Follow-up Pending', 'Interested', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'].map(s => (
                      <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>
                    ))}
                  </select>
                </div>
                <h3 className="text-display text-5xl font-bold text-white leading-tight">{lead.name}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/50">
                  Account specialist view for communication orchestration, deal health, and relationship history.
                </p>
              </div>

            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Email', value: lead.email, icon: Mail },
                { label: 'Phone', value: lead.phone, icon: PhoneCall },
                { label: 'WhatsApp', value: lead.whatsapp, icon: MessageCircleMore },
                { label: 'Website', value: lead.website, icon: Workflow },
                { label: 'LinkedIn', value: lead.linkedIn, icon: UserRound },
                { label: 'Last Reach', value: lead.lastReach, icon: History },
              ].map((item) => (
                <div key={item.label} className="group rounded-2xl border border-white/5 bg-white/3 p-4 transition hover:bg-white/5">
                  <div className="flex items-center gap-2 mb-2 text-white/30 group-hover:text-amber-400/60 transition-colors">
                    <item.icon className="h-3.5 w-3.5" />
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold">{item.label}</p>
                  </div>
                  <p className="text-sm text-white font-medium truncate">{item.value || 'Not provided'}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button 
                onClick={() => {
                  logCommunication('WhatsApp');
                  window.open(`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`, '_blank');
                }}
                className="rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] gap-2"
              >
                <MessageCircleMore className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button 
                onClick={() => {
                  logCommunication('Email');
                  window.location.href = `mailto:${lead.email}`;
                }}
                variant="secondary" 
                className="rounded-full gap-2"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              <Button 
                onClick={() => {
                  logCommunication('Call');
                  toast.promise(new Promise(r => setTimeout(r, 1000)), {
                    loading: 'Dialing...',
                    success: 'Call logged successfully',
                    error: 'Failed to log call'
                  });
                }}
                variant="outline" 
                className="rounded-full border-white/10 text-white/80 hover:text-white gap-2"
              >
                <PhoneCall className="h-4 w-4" />
                Log Call
              </Button>
            </div>
          </Card>

          <Card className="p-6 glass-edge overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-xl font-bold text-white">Relationship Timeline</h4>
                <p className="text-sm text-white/40">Audit trail of all interactions</p>
              </div>
              <History className="h-5 w-5 text-white/20" />
            </div>

            <div className="space-y-1 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
              {details.timeline.map((item, i) => (
                <div key={`${i}-${item.time}`} className="relative pl-8 py-3 group">
                  <div className={`absolute left-0 top-[18px] h-6 w-6 rounded-full border-4 border-[#0a0a0a] z-10 flex items-center justify-center ${
                    item.kind === 'communication' ? 'bg-sky-500' : 
                    item.kind === 'note' ? 'bg-amber-500' : 
                    item.kind === 'assignment' ? 'bg-violet-500' : 'bg-white/20'
                  }`} />
                  <div className="p-4 rounded-2xl border border-white/5 bg-white/2 group-hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider">{item.time}</p>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 glass-edge bg-gradient-to-br from-white/[0.05] to-transparent">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Next Action</h4>
                <p className="text-xs text-white/40">Upcoming milestone</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
              <p className="text-sm text-white leading-relaxed">{lead.nextAction}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Scheduled For</span>
                <span className="text-sm font-black text-amber-400">{lead.followUpAt}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">Action Controls</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-white/5 bg-white/2 text-white/70 hover:text-white h-9 text-xs">
                  Reschedule
                </Button>
                <Button className="bg-white/90 text-black hover:bg-white h-9 text-xs font-bold">
                  Mark Done
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-edge">
            <div className="flex items-center gap-2 mb-6 text-white/70">
              <Workflow className="h-4 w-4" />
              <h4 className="font-bold">Lead Enrichment</h4>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs text-white/40">Data Integrity</span>
                <span className="text-sm font-bold text-white">{completion}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-200 transition-all duration-1000" 
                  style={{ width: `${completion}%` }} 
                />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-white/10 bg-white/2">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-3">Missing Data Points</p>
              <div className="flex flex-wrap gap-2">
                {lead.missingFields?.length ? lead.missingFields.map(f => (
                  <Badge key={f} variant="outline" className="bg-rose-500/5 text-rose-300 border-rose-500/20 text-[10px]">
                    {f}
                  </Badge>
                )) : (
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" /> Fully Enriched
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-edge">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-white">Internal Notes</h4>
              <Plus className="h-4 w-4 text-white/20" />
            </div>
            
            <div className="space-y-3 mb-6">
              {details.notes.map((note, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 leading-relaxed">
                  {note}
                </div>
              ))}
            </div>

            <div className="relative">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type a internal note..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500/50 min-h-[80px] resize-none"
              />
              <Button 
                onClick={handleAddNote}
                size="icon" 
                className="absolute right-2 bottom-2 h-7 w-7 bg-amber-500 text-black hover:bg-amber-400"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center px-2">
        <Button variant="ghost" className="text-white/40 hover:text-white" asChild>
          <Link href="/leads">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pipeline
          </Link>
        </Button>
        <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">
          Lead Record: {id}
        </p>
      </div>
    </WorkspaceShell>
  );
}

// Add missing icon
function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}