import React, { useState, useEffect } from 'react';
import { useLeadsStore } from '@/lib/store/leads';
import { Lead, PipelineStage, LeadStatus } from '@/lib/crm-data';
import { X, Calendar, DollarSign, Building2, User, Mail, Phone, Globe, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils-crm';
import { toast } from 'sonner';

interface LeadFormModalProps {
  isOpen: boolean;
  lead?: Lead | null;
  onClose: () => void;
}

const STAGES: PipelineStage[] = ['New Lead', 'Initial Contact', 'Follow-up', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'];
const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Follow-up Pending', 'Interested', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'];
const PRIORITIES = ['Low', 'Medium', 'High'] as const;

export function LeadFormModal({ isOpen, lead, onClose }: LeadFormModalProps) {
  const { createLead, updateLead } = useLeadsStore();
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setFormData(lead);
    } else {
      setFormData({
        name: '',
        company: '',
        role: '',
        email: '',
        phone: '',
        stage: 'New Lead',
        status: 'New',
        priority: 'Medium',
        followUpAt: 'Tomorrow 10:00 AM',
      });
    }
  }, [lead, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const promise = new Promise(async (resolve) => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1200));

      if (lead?.id) {
        updateLead(lead.id, formData);
      } else {
        createLead(formData);
      }
      resolve(true);
    });

    toast.promise(promise, {
      loading: 'Encrypting and syncing record...',
      success: lead ? 'Opportunity record updated' : 'New lead successfully captured',
      error: 'Failed to save record'
    });

    await promise;
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0" />
        
        <div className="flex items-center justify-between border-b border-white/5 p-6 bg-white/[0.02]">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {lead ? 'Update Opportunity' : 'Capture New Lead'}
            </h2>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-medium">
              Sales Pipeline · Operational Entry
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-white/40 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Details */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  <User className="h-3 w-3" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.08] transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  <Building2 className="h-3 w-3" /> Company & Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleChange}
                    required
                    placeholder="Company"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50"
                  />
                  <input
                    type="text"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    <Mail className="h-3 w-3" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    <Phone className="h-3 w-3" /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

            </div>

            {/* Pipeline Status */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Stage</label>
                  <select
                    name="stage"
                    value={formData.stage || 'New Lead'}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                  >
                    {STAGES.map((s) => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Status</label>
                  <select
                    name="status"
                    value={formData.status || 'New'}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                  >
                    {STATUSES.map((s) => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Priority Level</label>
                <div className="flex gap-2">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: p }))}
                      className={`flex-1 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-tighter transition-all ${
                        formData.priority === p 
                          ? 'bg-amber-500 border-amber-500 text-black' 
                          : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  <Calendar className="h-3 w-3" /> Next Follow-up
                </label>
                <input
                  type="text"
                  name="followUpAt"
                  value={formData.followUpAt || ''}
                  onChange={handleChange}
                  placeholder="Tomorrow 10:00 AM"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="rounded-2xl bg-rose-500/5 border border-rose-500/10 p-4">
                <div className="flex items-center gap-2 text-rose-300 mb-2">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <p className="text-[10px] font-bold uppercase">Record Security</p>
                </div>
                <p className="text-[10px] text-rose-300/50 leading-relaxed">
                  Entries are persisted locally and encrypted in the workspace session. Ensure all mandatory fields are verified before finalizing.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl border-white/10 h-12 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[11px]"
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-2xl bg-amber-500 text-black h-12 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-amber-400 shadow-xl shadow-amber-500/20 disabled:opacity-50"
            >
              {isSaving ? 'Encrypting Record...' : lead ? 'Apply Updates' : 'Commit to Pipeline'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

