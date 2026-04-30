'use client';

import { BellRing, Calendar, CalendarDays, Clock3, PhoneCall, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLeadsStore } from '@/lib/store/leads';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';

export function FollowupsWorkspace() {
  const { leads } = useLeadsStore();

  const pendingFollowups = leads
    .filter((lead) => lead.followUpAt)
    .sort((a, b) => new Date(a.followUpAt).getTime() - new Date(b.followUpAt).getTime());

  const overdue = pendingFollowups.filter((lead) => new Date(lead.followUpAt) < new Date());
  const dueToday = pendingFollowups.filter(
    (lead) =>
      new Date(lead.followUpAt).toDateString() === new Date().toDateString()
  );
  const upcoming = pendingFollowups.filter((lead) => new Date(lead.followUpAt) > new Date());

  const markComplete = (name: string) => {
    toast.success(`Follow-up with ${name} marked as complete`);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h3 className="text-2xl font-black tracking-tight italic">Follow-up Center</h3>
          <p className="text-sm text-muted-foreground font-medium">Timeline-based prioritization for pending sales actions.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-9 rounded-xl font-bold uppercase tracking-widest text-[10px] gap-2">
             <CalendarDays size={14} />
             View Calendar
           </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Overdue', value: overdue.length, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
          { label: 'Due Today', value: dueToday.length, icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { label: 'Upcoming', value: upcoming.length, icon: Clock3, color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
        ].map((stat, i) => (
          <Card key={i} className={cn("p-6 border transition-all hover:scale-[1.02]", stat.border, stat.bg)}>
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-background shadow-sm", stat.color)}>
                <stat.icon size={18} />
              </div>
              <Badge variant="outline" className="border-background/50 text-[8px] font-black uppercase">Priority</Badge>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{stat.label}</p>
            <h3 className="text-4xl font-black tracking-tighter mt-1">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgent Followups */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
             <h4 className="text-xs font-black uppercase tracking-[0.2em] text-rose-500">Immediate Action Required</h4>
             <span className="text-[10px] font-bold text-muted-foreground/40">{overdue.length + dueToday.length} items</span>
          </div>
          <div className="space-y-3">
            {[...overdue, ...dueToday].map((lead) => (
              <Card key={lead.id} className="p-4 bg-card/60 hover:bg-card border-border hover:border-primary/20 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 h-1 w-full bg-rose-500/20" />
                <div className="flex items-center justify-between gap-4">
                  <Link href={`/leads/${lead.id}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full aurum-gradient flex items-center justify-center text-xs font-black text-white shadow-lg shadow-primary/20 shrink-0">
                        {lead.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors truncate tracking-tight">{lead.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium truncate uppercase tracking-widest">{lead.company}</p>
                      </div>
                    </div>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => markComplete(lead.name)}
                    className="rounded-xl px-4 h-9 font-bold uppercase tracking-widest text-[9px] hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/20"
                  >
                    Resolve
                  </Button>
                </div>
              </Card>
            ))}
            {[...overdue, ...dueToday].length === 0 && (
              <div className="py-12 border-2 border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center">
                 <CheckCircle2 className="h-8 w-8 text-emerald-500/20 mb-3" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">All actions resolved</p>
              </div>
            )}
          </div>
        </div>

        {/* Scheduled / Upcoming */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
             <h4 className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">Scheduled Reminders</h4>
             <span className="text-[10px] font-bold text-muted-foreground/40">{upcoming.length} items</span>
          </div>
          <div className="space-y-3">
            {upcoming.slice(0, 4).map((lead) => (
              <Card key={lead.id} className="p-4 bg-muted/20 hover:bg-muted/30 border-border/40 transition-all group">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-background flex items-center justify-center text-sky-500 shadow-sm border border-border">
                       <Clock3 size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground truncate tracking-tight">{lead.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                        {new Date(lead.followUpAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <Link href={`/leads/${lead.id}`}>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground hover:text-primary">
                      <ChevronRight size={14} />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
            View Full Timeline
          </Button>
        </div>
      </div>

      {/* Integration Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Reminder automation', desc: 'Sync with Email & SMS', icon: BellRing },
          { label: 'Interaction Logs', desc: 'Auto-record all outreach', icon: PhoneCall },
          { label: 'Calendar Bridge', desc: 'Google & Outlook Sync', icon: CalendarDays },
        ].map((item, i) => (
          <Card key={i} className="p-4 hover:border-primary/20 transition-all cursor-pointer group bg-card/40">
            <div className="flex items-center gap-4">
               <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:text-primary transition-colors">
                  <item.icon size={18} />
               </div>
               <div>
                  <p className="text-[11px] font-black uppercase tracking-tight">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}