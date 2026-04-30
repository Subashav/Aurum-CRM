import { ArrowRight, Bell, CalendarDays, CheckCircle2, Clock3, Sparkles, Users2, TrendingUp, BarChart3, DollarSign, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { activityFeed, dashboardMetrics } from '@/lib/crm-data';

// High-level dashboard keeps operational summary separate from the lead workspace.
export function OverviewDashboard() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
      <Card className="relative overflow-hidden p-6 lg:p-8 animate-rise glass-edge lift-on-hover">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-300/14 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-sky-300/12 blur-3xl" aria-hidden="true" />

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.26em] text-white/40">Operational overview</p>
              <h3 className="text-display text-shimmer text-5xl leading-none sm:text-6xl">Fast control, clear pressure, decisive follow-through.</h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                This dashboard only carries leadership signals: pipeline health, team activity, revenue movement, reminders, and quick actions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[440px]">
              {[
                { label: 'Open', value: '248', icon: Users2 },
                { label: 'Due today', value: '14', icon: Clock3 },
                { label: 'Won', value: '14', icon: DollarSign },
                { label: 'Overdue', value: '07', icon: Bell },
              ].map((item) => {
                const Icon = (item as any).icon as any;
                return (
                  <div key={(item as any).label} className="rounded-2xl border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">{(item as any).label}</p>
                      {Icon ? <Icon className="h-4 w-4 text-white/60" /> : null}
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-display text-3xl text-white">{(item as any).value}</p>
                      <svg className="h-6 w-20 opacity-80" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="0,8 6,6 12,7 18,4 24,5 30,3 36,4 40,2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {[
              ['Pipeline', '8 active stages in motion', CheckCircle2, TrendingUp],
              ['Automation', '3 rules fired in the last hour', Sparkles, Activity],
              ['Collaboration', '11 team actions logged today', Users2, BarChart3],
              ['Schedule', '5 follow-ups timed for the next 6 hours', CalendarDays, Clock3],
            ].map(([title, detail, Icon, Accent]) => (
              <div key={title as string} className="rounded-[1.25rem] border border-white/8 bg-gradient-to-br from-white/3 to-white/2 p-4 glass-edge lift-on-hover">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    <span className="font-medium">{title as string}</span>
                  </div>
                  {Accent ? <Accent className="h-5 w-5 text-white/50" /> : null}
                </div>
                <p className="text-sm leading-6 text-white/55">{detail as string}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        <Card className="flex flex-col gap-5 p-5 glass-edge lift-on-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Live operations</p>
              <h4 className="mt-1 text-xl text-white">Team pulse</h4>
            </div>
            <Badge className="border-amber-400/20 bg-amber-300/10 text-amber-100">Realtime</Badge>
          </div>

          <div className="space-y-3">
            {[
              ['Assignment queue', '6 leads waiting for distribution', 'warning'],
              ['Follow-up pressure', '7 overdue leads need outreach', 'danger'],
              ['Fresh conversions', '3 deals closed in the last 24 hours', 'success'],
            ].map(([title, detail, tone]) => (
              <div key={title as string} className="rounded-2xl border border-white/10 bg-white/4 p-4 glass-edge lift-on-hover">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-white">{title as string}</p>
                    <p className="mt-1 text-xs text-white/45">{detail as string}</p>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${tone === 'warning' ? 'bg-amber-300' : tone === 'danger' ? 'bg-rose-300' : 'bg-emerald-300'}`} />
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full justify-between" variant="secondary">
            Open follow-up center
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        <Card className="flex flex-col gap-5 p-5 glass-edge lift-on-hover">
          <div className="flex items-center gap-2 text-white/70">
            <Bell className="h-4 w-4" />
            Notifications
          </div>
          <p className="text-sm leading-6 text-white/55">
            Assignment alerts, overdue reminders, conversion updates, and important workflow notices appear here.
          </p>
        </Card>
      </div>
      
      <Card className="xl:col-span-2 p-5 glass-edge lift-on-hover">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Activity stream</p>
            <h4 className="mt-1 text-xl text-white">Operational feed</h4>
          </div>
          <Clock3 className="h-5 w-5 text-white/40" />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {activityFeed.map((item) => (
            <div key={item.time} className="rounded-2xl border border-white/10 bg-white/4 p-4 glass-edge lift-on-hover">
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">{item.time}</p>
              <p className="mt-2 text-sm text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/55">{item.detail}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-4">
        {dashboardMetrics.map((metric, idx) => (
          <Card key={metric.label} className="p-5 glass-edge lift-on-hover">
            <div className="flex items-center justify-between">
              <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-white/45">{metric.label}</p>
              {idx % 3 === 0 ? <TrendingUp className="h-4 w-4 text-white/40" /> : idx % 3 === 1 ? <BarChart3 className="h-4 w-4 text-white/40" /> : <DollarSign className="h-4 w-4 text-white/40" />}
            </div>
            <div className="flex items-end justify-between">
              <p className="text-display text-4xl leading-none text-white">{metric.value}</p>
              <svg className="h-6 w-24 opacity-80" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="0,9 6,6 12,7 18,3 24,5 30,4 36,2 42,6 48,4" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p className={`mt-3 text-sm ${metric.tone}`}>{metric.delta}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}