'use client';

import { useMemo, useState, type ComponentType } from 'react';
import Link from 'next/link';
import {
  ArrowUpDown,
  Bell,
  CircleDashed,
  Edit3,
  Filter,
  MoreHorizontal,
  Search,
  Share2,
  Sparkles,
  Trash2,
  UserRoundPen,
  Users2,
  Plus,
  ChevronDown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PremiumTable from '@/components/ui/premium-table';
import { type Lead } from '@/lib/crm-data';
import { cn } from '@/lib/cn';
import { useLeadsStore } from '@/lib/store/leads';
import { LeadFormModal } from '@/components/modals/lead-form-modal';
import { toast } from 'sonner';

import { useSearchParams } from 'next/navigation';

// Realistic prospect list layout modeled after high-density CRM systems.
export function LeadsWorkspace() {
  const searchParams = useSearchParams();
  const {
    leads,
    searchQuery,
    filterStage,
    filterStatus,
    sortBy,
    sortOrder,
    setSearchQuery,
    setFilterStage,
    setFilterStatus,
    setSortConfig,
    getSortedLeads,
    deleteLead,
    updateLead,
  } = useLeadsStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const sortedLeads = useMemo(() => getSortedLeads(), [getSortedLeads]);

  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setIsFormOpen(true);
    }
  }, [searchParams]);

  const stages = ['New Lead', 'Initial Contact', 'Follow-up', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'];
  const statuses = ['New', 'Contacted', 'Follow-up Pending', 'Interested', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'];

  const toggleSelectAll = () => {
    if (selectedIds.length === sortedLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedLeads.map(l => l.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = () => {
    const count = selectedIds.length;
    if (confirm(`Are you sure you want to delete ${count} leads?`)) {
      selectedIds.forEach(id => deleteLead(id));
      setSelectedIds([]);
      toast.success(`Successfully deleted ${count} leads`);
    }
  };

  const handleCreateNew = () => {
    setEditingLead(null);
    setIsFormOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.success('Lead deleted successfully');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingLead(null);
  };

  return (
    <div className="space-y-4">
      <Card className="border border-white/10 bg-surface/90 p-4 shadow-atmosphere backdrop-blur-xl lg:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">Dashboard / Leads</p>
              <h3 className="mt-2 text-display text-3xl text-white">Leads Management</h3>
              <p className="mt-2 text-sm text-white/55">Create, manage, and track all your leads in one unified workspace.</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1.5 transition hover:bg-amber-500/20 text-amber-300"
              >
                <Plus className="h-3.5 w-3.5" />
                New Lead
              </button>

              {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 animate-in slide-in-from-left duration-300">
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <span className="text-white/40 mr-2">{selectedIds.length} selected</span>
                  <button
                    onClick={handleBulkDelete}
                    className="inline-flex items-center gap-2 rounded-full border border-rose-500/50 bg-rose-500/10 px-3 py-1.5 transition hover:bg-rose-500/20 text-rose-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="text-white/30 hover:text-white transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[520px]">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="pl-10"
                  placeholder="Search leads..."
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition"
              >
                <Filter className="h-4 w-4" />
                {filterStage || filterStatus ? 'Filtered' : 'Filter'}
              </button>
            </div>

            {showFilters && (
              <div className="space-y-2 p-3 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <label className="text-xs text-white/60 mb-1 block">Stage</label>
                  <select
                    value={filterStage || ''}
                    onChange={(e) => setFilterStage((e.target.value as any) || null)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
                  >
                    <option value="">All Stages</option>
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/60 mb-1 block">Status</label>
                  <select
                    value={filterStatus || ''}
                    onChange={(e) => setFilterStatus((e.target.value as any) || null)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
                  >
                    <option value="">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 text-xs text-white/70">
              {filterStage && (
                <Badge className="border-white/10 bg-amber-500/20 text-amber-300">Stage: {filterStage}</Badge>
              )}
              {filterStatus && (
                <Badge className="border-white/10 bg-amber-500/20 text-amber-300">Status: {filterStatus}</Badge>
              )}
              {(filterStage || filterStatus) && (
                <button
                  onClick={() => {
                    setFilterStage(null);
                    setFilterStatus(null);
                  }}
                  className="text-xs text-white/50 hover:text-white transition"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs text-white/45">
          <div className="flex items-center gap-3">
            <span className="font-medium text-white/70">Leads ({sortedLeads.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortConfig(e.target.value as any, sortOrder)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 transition"
            >
              <option value="createdAt">Sort: Recent</option>
              <option value="name">Sort: Name</option>
              <option value="priority">Sort: Priority</option>
              <option value="followUp">Sort: Follow-up</option>
            </select>
            <button
              onClick={() => setSortConfig(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 transition"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <div className="p-0">
          <PremiumTable
            columns={[
              {
                key: 'select',
                title: (
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === sortedLeads.length && sortedLeads.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-white/10 bg-white/5 accent-amber-500"
                  />
                ),
                width: '40px',
                render: (row: any) => (
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleSelectOne(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-4 w-4 rounded border-white/10 bg-white/5 accent-amber-500"
                  />
                )
              },
              {
                key: 'name',
                title: 'Lead Name',
                width: '28%',
                render: (row: any) => (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--panel-strong)', color: 'var(--fg-color)', fontWeight: 600 }}>
                      {row.name
                        .split(' ')
                        .map((part: string) => part[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <Link href={`/leads/${row.id}`} className="font-medium hover:underline" style={{ color: 'var(--fg-color)' }}>{row.name}</Link>
                      <div style={{ color: 'var(--muted)' }} className="text-xs">{row.company}</div>
                    </div>
                  </div>
                ),
                editable: true,
              },
              { key: 'email', title: 'Email', width: '18%', editable: true },
              { key: 'phone', title: 'Phone', width: '14%', editable: true },
              { key: 'stage', title: 'Stage', width: '12%', editable: true, editor: 'select', options: stages },
              { key: 'status', title: 'Status', width: '12%', editable: true, editor: 'select', options: statuses },
              { key: 'priority', title: 'Priority', width: '8%', editable: true, editor: 'select', options: ['High', 'Medium', 'Low'] },
              { key: 'followUpAt', title: 'Follow-up', width: '8%', render: (row: any) => new Date(row.followUpAt).toLocaleDateString() },
              {
                key: 'actions',
                title: 'Actions',
                width: '6%',
                render: (row: any) => (
                  <div className="inline-flex items-center gap-1.5">
                    <ActionButton icon={Edit3} label={`Edit ${row.name}`} onClick={() => handleEdit(row)} />
                    <ActionButton icon={Trash2} label={`Delete ${row.name}`} onClick={() => handleDelete(row.id)} />
                  </div>
                ),
              },
            ]}
            data={sortedLeads}
            onUpdate={(id, updates) => {
              updateLead(id, updates as any);
            }}
          />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-white/55">
          <p>Showing {sortedLeads.length} records</p>
        </div>
      </Card>

      <LeadFormModal isOpen={isFormOpen} lead={editingLead} onClose={handleFormClose} />
    </div>
  );
}

type ActionButtonProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
};

function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}