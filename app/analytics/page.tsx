'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layouts/workspace-shell';
import { Card } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, Target, Clock, Zap } from 'lucide-react';

const conversionData = [
  { name: 'Mon', leads: 40, conv: 24 },
  { name: 'Tue', leads: 30, conv: 13 },
  { name: 'Wed', leads: 20, conv: 98 },
  { name: 'Thu', leads: 27, conv: 39 },
  { name: 'Fri', leads: 18, conv: 48 },
  { name: 'Sat', leads: 23, conv: 38 },
  { name: 'Sun', leads: 34, conv: 43 },
];

const velocityData = [
  { time: '10am', value: 12 },
  { time: '11am', value: 45 },
  { time: '12pm', value: 32 },
  { time: '1pm', value: 67 },
  { time: '2pm', value: 45 },
  { time: '3pm', value: 89 },
  { time: '4pm', value: 56 },
];

export default function AnalyticsPage() {
  return (
    <WorkspaceShell 
      title="Revenue Analytics" 
      eyebrow="Intelligence Engine" 
      subtitle="Deep insights into pipeline velocity and conversion health."
    >
      <div className="space-y-6">
        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Avg. Response Time', value: '1.2h', delta: '-15%', icon: Clock, color: 'text-sky-400' },
            { label: 'Lead Velocity', value: '+42%', delta: '+12% wk', icon: TrendingUp, color: 'text-amber-400' },
            { label: 'Conversion Efficiency', value: '28.4%', delta: '+4.2%', icon: Target, color: 'text-emerald-400' },
            { label: 'System Uptime', value: '99.99%', delta: 'Live', icon: Zap, color: 'text-violet-400' },
          ].map((m, i) => (
            <Card key={i} className="p-5 bg-white/5 border-white/10 glass-edge">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{m.label}</p>
                <m.icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-white">{m.value}</h3>
              <p className="text-[10px] text-white/40 mt-1 font-bold">{m.delta}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Chart */}
          <Card className="p-6 bg-white/5 border-white/10 glass-edge">
            <h4 className="text-lg font-bold text-white mb-6">Conversion Funnel Volume</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversionData}>
                  <defs>
                    <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="conv" stroke="#fbbf24" fillOpacity={1} fill="url(#colorConv)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Velocity Chart */}
          <Card className="p-6 bg-white/5 border-white/10 glass-edge">
            <h4 className="text-lg font-bold text-white mb-6">Real-time Lead Velocity</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Line type="stepAfter" dataKey="value" stroke="#38bdf8" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Insight Section */}
        <Card className="p-8 bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-2xl shadow-amber-500/20">
              <Zap className="h-8 w-8 text-black" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Predictive AI Insights</h4>
              <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
                Based on current lead velocity and conversion efficiency, the system predicts a <span className="text-amber-400 font-bold">22% increase</span> in pipeline throughput by the end of Q3. Follow-up latency has decreased by 15 minutes on average since last week.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </WorkspaceShell>
  );
}