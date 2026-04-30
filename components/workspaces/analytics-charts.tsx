'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useLeadsStore } from '@/lib/store/leads';

export function AnalyticsDashboard() {
  const { leads } = useLeadsStore();

  // Stage Distribution
  const stageData = useMemo(() => {
    const stages = ['Prospecting', 'Qualification', 'Proposal Sent', 'Negotiation', 'Conversion'];
    return stages.map((stage) => ({
      name: stage,
      count: leads.filter((l) => l.stage === stage).length,
    }));
  }, [leads]);

  // Status Distribution
  const statusData = useMemo(() => {
    const statuses = ['Fresh', 'Interested', 'Not Interested', 'On Hold'];
    return statuses.map((status) => ({
      name: status,
      count: leads.filter((l) => l.status === status).length,
    }));
  }, [leads]);

  // Priority Distribution
  const priorityData = useMemo(() => {
    const priorities = ['Low', 'Medium', 'High'];
    return priorities.map((priority) => ({
      name: priority,
      count: leads.filter((l) => l.priority === priority).length,
    }));
  }, [leads]);

  // Timeline Data (simulated)
  const timelineData = useMemo(() => {
    return [
      { date: 'Mon', leads: 12, conversions: 3 },
      { date: 'Tue', leads: 15, conversions: 4 },
      { date: 'Wed', leads: 18, conversions: 5 },
      { date: 'Thu', leads: 16, conversions: 4 },
      { date: 'Fri', leads: 20, conversions: 6 },
      { date: 'Sat', leads: 14, conversions: 3 },
      { date: 'Sun', leads: 11, conversions: 2 },
    ];
  }, []);

  const COLORS = {
    primary: '#fbbf24',
    secondary: '#06b6d4',
    success: '#10b981',
    warning: '#f97316',
    error: '#ef4444',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Key Metrics */}
      <motion.div className="grid grid-cols-4 gap-4" variants={itemVariants}>
        <motion.div className="rounded-xl p-4" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <p style={{ color: 'var(--muted)' }} className="text-sm mb-2">Total Leads</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--fg-color)' }}>{leads.length}</p>
          <p className="text-xs mt-2" style={{ color: 'var(--success)' }}>+2 this week</p>
        </motion.div>
        <motion.div className="rounded-xl p-4" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <p style={{ color: 'var(--muted)' }} className="text-sm mb-2">Conversion Rate</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--fg-color)' }}>
            {leads.length > 0 ? Math.round((leads.filter(l => l.stage === 'Converted').length / leads.length) * 100) : 0}%
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--success)' }}>+1.2% vs last week</p>
        </motion.div>
        <motion.div className="rounded-xl p-4" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <p style={{ color: 'var(--muted)' }} className="text-sm mb-2">Hot Leads</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--fg-color)' }}>
            {leads.filter(l => l.priority === 'High').length}
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--warning)' }}>High priority only</p>
        </motion.div>
        <motion.div className="rounded-xl p-4" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <p style={{ color: 'var(--muted)' }} className="text-sm mb-2">Pending Follow-ups</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--fg-color)' }}>
            {leads.filter(l => new Date(l.followUpAt) <= new Date()).length}
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>Needs action</p>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div className="grid grid-cols-2 gap-6" variants={itemVariants}>
        {/* Line Chart - Activity */}
        <motion.div className="rounded-xl p-6" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--fg-color)' }}>Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis stroke="rgba(255,255,255,0.2)" />
              <YAxis stroke="rgba(255,255,255,0.2)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value) => [value, '']}
              />
              <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.5)' }} />
              <Line type="monotone" dataKey="leads" stroke={COLORS.primary} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="conversions" stroke={COLORS.secondary} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart - Stage Distribution */}
        <motion.div className="rounded-xl p-6" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--fg-color)' }}>Leads by Stage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" />
              <YAxis stroke="rgba(255,255,255,0.2)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="count" fill={COLORS.primary} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart - Status */}
        <motion.div className="rounded-xl p-6" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--fg-color)' }}>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${entry.count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                <Cell fill={COLORS.primary} />
                <Cell fill={COLORS.success} />
                <Cell fill={COLORS.error} />
                <Cell fill={COLORS.secondary} />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart - Priority */}
        <motion.div className="rounded-xl p-6" style={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)' }} variants={itemVariants}>
          <h3 className="font-semibold mb-4" style={{ color: 'var(--fg-color)' }}>Leads by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" />
              <YAxis stroke="rgba(255,255,255,0.2)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="count" fill={COLORS.secondary} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
