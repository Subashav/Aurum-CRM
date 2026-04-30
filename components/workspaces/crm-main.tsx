"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  Zap,
  Calendar,
  Activity,
  DollarSign
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useLeadsStore } from '@/lib/store/leads';
import Link from 'next/link';

export function CRMMainDashboard() {
  const { leads } = useLeadsStore();

  const kpis = [
    { label: 'Total pipeline', value: '$2.4M', change: '+12.5%', icon: DollarSign, color: 'text-amber-500' },
    { label: 'Active Leads', value: leads.length, change: '+4.2%', icon: Users, color: 'text-blue-500' },
    { label: 'Conv. Rate', value: '18.2%', change: '+1.5%', icon: Target, color: 'text-emerald-500' },
    { label: 'Avg. Deal Cycle', value: '14 Days', change: '-2d', icon: Clock, color: 'text-violet-500' },
  ];

  const chartData = [
    { date: 'Apr 24', value: 4000, leads: 12 },
    { date: 'Apr 25', value: 3000, leads: 8 },
    { date: 'Apr 26', value: 2000, leads: 15 },
    { date: 'Apr 27', value: 2780, leads: 22 },
    { date: 'Apr 28', value: 1890, leads: 10 },
    { date: 'Apr 29', value: 2390, leads: 18 },
    { date: 'Apr 30', value: 3490, leads: 25 },
  ];

  const topLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [leads]);

  return (
    <div className="space-y-8 pb-12">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:border-primary/20 group transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg bg-muted group-hover:bg-background transition-colors", kpi.color)}>
                  <kpi.icon size={16} />
                </div>
                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", 
                  kpi.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                )}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{kpi.value}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 overflow-hidden border-border/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Revenue Operations</h3>
              <p className="text-xs text-muted-foreground">Pipeline growth over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-muted rounded-md text-[10px] font-bold uppercase tracking-wider">
              <button className="px-3 py-1.5 bg-background shadow-sm rounded text-foreground transition-all">Revenue</button>
              <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-all">Leads</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Timeline */}
        <Card className="flex flex-col border-border/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold tracking-tight">Recent Activity</h3>
            <Activity size={16} className="text-primary" />
          </div>
          <div className="flex-1 space-y-6">
            {[
              { type: 'Lead', text: 'New lead "AstraForge" added by System', time: '12m ago', icon: Zap, color: 'text-amber-500' },
              { type: 'Deal', text: 'Negotiation stage reached for "Northstar"', time: '1h ago', icon: TrendingUp, color: 'text-emerald-500' },
              { type: 'Meeting', text: 'Demo scheduled with BlueCrest Logistics', time: '3h ago', icon: Calendar, color: 'text-blue-500' },
              { type: 'Update', text: 'Team performance report generated', time: '5h ago', icon: BarChart3, color: 'text-violet-500' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative group cursor-pointer">
                <div className={cn("mt-1 shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center transition-transform group-hover:scale-110", item.color)}>
                  <item.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.time} • {item.type}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-xs text-muted-foreground hover:text-foreground">View All Events</Button>
        </Card>
      </div>

      {/* Prospect Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="flex items-center justify-between mb-6 p-2">
          <div>
            <h3 className="text-lg font-bold tracking-tight">High-Velocity Prospects</h3>
            <p className="text-xs text-muted-foreground">Highest engagement score this week</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/leads">View All</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-3 text-left">Prospect</th>
                <th className="px-6 py-3 text-left">Engagement</th>
                <th className="px-6 py-3 text-left">Stage</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-muted/30 transition-all cursor-pointer" onClick={() => window.location.href = `/leads/${lead.id}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold ring-1 ring-primary/20">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{lead.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${lead.score}%` }}
                          className="h-full bg-primary" 
                        />
                      </div>
                      <span className="text-[10px] font-bold">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[10px] bg-background">
                      {lead.stage}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowUpRight size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
