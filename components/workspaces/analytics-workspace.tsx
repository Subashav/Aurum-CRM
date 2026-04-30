'use client';

import { AreaChart, ArrowUpRight, BarChart3, Radar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AnalyticsDashboard } from '@/components/workspaces/analytics-charts';

export function AnalyticsWorkspace() {
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-white/10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-2">Workspace / Analytics</p>
        <h3 className="text-3xl font-semibold text-white mb-2">CRM Analytics Dashboard</h3>
        <p className="text-white/55">Monitor your sales pipeline performance, conversion rates, and team metrics in real-time.</p>
      </Card>

      <AnalyticsDashboard />
    </div>
  );
}