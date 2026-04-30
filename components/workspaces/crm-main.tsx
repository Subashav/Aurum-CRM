'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  MoreHorizontal, 
  Plus, 
  Search,
  Filter,
  BarChart3,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
import { pipeline } from '@/lib/crm-data';
import { LeadFormModal } from '@/components/modals/lead-form-modal';
import { useRouter } from 'next/navigation';
import { useLeadsStore } from '@/lib/store/leads';
import Link from 'next/link';

export function CRMMainDashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { leads } = useLeadsStore();

  const topLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [leads]);

  const funnelData = useMemo(() => {
    return pipeline.slice(0, 6).map((p, idx) => ({
      name: p.stage,
      value: p.count,
      fill: `rgba(251, 191, 36, ${1 - idx * 0.12})`
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-6 pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Sales Command Center</h2>
          <p className="text-white/50">Real-time revenue operations and pipeline health.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button 
            onClick={() => router.push('/leads?create=true')}
            className="bg-amber-400 text-black hover:bg-amber-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Active Leads', value: leads.length.toString(), sub: '18 added this week', icon: Users, color: 'text-sky-400' },
          { label: 'Conversion Rate', value: '18.4%', sub: '+2.1% improvement', icon: Target, color: 'text-emerald-400' },
          { label: 'Avg. Deal Cycle', value: '14 Days', sub: '-3 days faster', icon: Clock, color: 'text-violet-400' },
        ].map((kpi, i) => (
          <Card key={i} className="border-white/10 bg-white/5 p-5 glass-edge lift-on-hover">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">{kpi.label}</p>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </div>
            <div className="mt-3">
              <h3 className="text-3xl font-bold text-white">{kpi.value}</h3>
              <p className="mt-1 text-xs text-white/50">{kpi.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-1 border-white/10 bg-white/5 p-6 glass-edge lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Sales Pipeline Funnel</h3>
              <p className="text-sm text-white/50">Lead volume across stages</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
              <button className="rounded-md bg-white/10 px-3 py-1 text-xs text-white">Count</button>
              <button className="px-3 py-1 text-xs text-white/50 hover:text-white">Volume</button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={funnelData}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/5 p-6 glass-edge">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Immediate Focus</h3>
            <p className="text-sm text-white/50">High-priority tasks for today</p>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Follow-up: Northstar Health', time: '10:30 AM', type: 'Call', priority: 'High' },
              { title: 'Revise Proposal: AstraForge', time: '02:15 PM', type: 'Doc', priority: 'High' },
              { title: 'Demo: BlueCrest Logistics', time: 'Tomorrow', type: 'Meeting', priority: 'Med' },
              { title: 'Contract Review: Sneha Kapoor', time: 'In 2 days', type: 'Legal', priority: 'Med' },
            ].map((action, i) => (
              <div key={i} className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/3 p-3 transition hover:bg-white/5">
                <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${action.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {action.type === 'Call' ? <Clock className="h-4 w-4" /> : action.type === 'Meeting' ? <Calendar className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">{action.title}</p>
                  <p className="text-xs text-white/40">{action.time} • {action.type}</p>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/30 hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-4 w-full text-xs text-white/50 hover:text-white" asChild>
            <Link href="/followups">View all tasks</Link>
          </Button>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/5 glass-edge overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <div>
            <h3 className="text-xl font-bold text-white">High-Velocity Prospects</h3>
            <p className="text-sm text-white/50">Leads with highest engagement scores</p>
          </div>
          <Link href="/leads" className="text-xs text-amber-400 hover:underline">View all leads</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-xs uppercase tracking-wider text-white/30">
                <th className="px-6 py-4 font-medium">Lead Name</th>
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium">Score</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3" onClick={() => router.push(`/leads/${lead.id}`)}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white cursor-pointer hover:text-amber-400">{lead.name}</p>
                        <p className="text-xs text-white/40">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-white/10 bg-white/5 text-[10px] text-white/70">
                      {lead.stage}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-white/10">
                        <div 
                          className="h-full rounded-full bg-amber-400" 
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/60">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/30 hover:text-white" asChild>
                      <Link href={`/leads/${lead.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
