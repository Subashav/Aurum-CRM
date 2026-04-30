import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Lead, LeadDetail, PipelineStage, LeadStatus } from '@/lib/crm-data';
import { leads as initialLeads, leadDetails as initialLeadDetails } from '@/lib/crm-data';

/**
 * Main store for managing leads, their details, and UI filter/sort states.
 */
interface LeadsStore {
  /** List of all lead summaries */
  leads: Lead[];
  /** Detailed information for each lead, indexed by ID */
  leadDetails: Record<string, LeadDetail>;
  /** Current search query for filtering leads */
  searchQuery: string;
  /** Filter leads by their current pipeline stage */
  filterStage: PipelineStage | null;
  /** Filter leads by their status */
  filterStatus: LeadStatus | null;
  /** Current sorting field */
  sortBy: 'name' | 'updatedBy' | 'followUpAt' | 'priority' | 'createdAt';
  /** Current sorting direction */
  sortOrder: 'asc' | 'desc';

  
  // Setters
  setSearchQuery: (query: string) => void;
  setFilterStage: (stage: PipelineStage | null) => void;
  setFilterStatus: (status: LeadStatus | null) => void;
  setSortConfig: (sortBy: 'name' | 'updatedBy' | 'followUpAt' | 'priority' | 'createdAt', sortOrder: 'asc' | 'desc') => void;
  
  // Actions
  createLead: (lead: Partial<Lead>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  updateLeadDetail: (id: string, detail: Partial<LeadDetail>) => void;
  addActivity: (id: string, activity: { title: string; detail: string; kind: 'activity' | 'communication' | 'assignment' | 'note' }) => void;
  
  // Computed
  getFilteredLeads: () => Lead[];
  getSortedLeads: () => Lead[];
}

const generateLeadId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `L-${(timestamp + random).toUpperCase()}`;
};

export const useLeadsStore = create<LeadsStore>()(
  persist(
    (set, get) => ({
      leads: initialLeads,
      leadDetails: initialLeadDetails,
      searchQuery: '',
      filterStage: null,
      filterStatus: null,
      sortBy: 'createdAt',
      sortOrder: 'desc',

      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterStage: (stage) => set({ filterStage: stage }),
      setFilterStatus: (status) => set({ filterStatus: status }),
      setSortConfig: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

      createLead: (lead) => set((state) => {
        const id = generateLeadId();
        const newLead: Lead = {
          id,
          name: lead.name || 'New Prospect',
          company: lead.company || 'Unknown Company',
          role: lead.role || 'Prospect',
          email: lead.email || '',
          phone: lead.phone || '',
          whatsapp: lead.whatsapp || '',
          website: lead.website || '',
          linkedIn: lead.linkedIn || '',
          stage: lead.stage || 'New Lead',
          status: lead.status || 'New',
          priority: lead.priority || 'Medium',
          owner: lead.owner || 'You',
          followUpAt: lead.followUpAt || 'Today 5:00 PM',
          source: lead.source || 'Direct',
          country: lead.country || '',
          city: lead.city || '',
          score: lead.score || 20,
          lastReach: 'Just now',
          nextAction: lead.nextAction || 'Initial reach out',
          missingFields: [],
          createdAt: new Date().toISOString(),
        };

        const newDetail: LeadDetail = {
          ...newLead,
          notes: [],
          attachments: [],
          timeline: [
            { time: 'Just now', title: 'Lead created', detail: 'Prospect manually added to the system.', kind: 'activity' }
          ],
        };

        return { 
          leads: [newLead, ...state.leads],
          leadDetails: { ...state.leadDetails, [id]: newDetail }
        };
      }),

      updateLead: (id, updates) => set((state) => {
        const updatedLeads = state.leads.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead));
        
        // If stage or status changed, log activity
        if (updates.stage || updates.status) {
          const oldLead = state.leads.find(l => l.id === id);
          if (oldLead && state.leadDetails[id]) {
            const detail = updates.stage ? `Moved from ${oldLead.stage} to ${updates.stage}` : `Status changed to ${updates.status}`;
            get().addActivity(id, {
              title: updates.stage ? 'Stage Updated' : 'Status Changed',
              detail,
              kind: 'activity'
            });
          }
        }

        return { leads: updatedLeads };
      }),

      deleteLead: (id) => set((state) => {
        const { [id]: _, ...remainingDetails } = state.leadDetails;
        return {
          leads: state.leads.filter((lead) => lead.id !== id),
          leadDetails: remainingDetails
        };
      }),

      updateLeadDetail: (id, detail) => set((state) => ({
        leadDetails: {
          ...state.leadDetails,
          [id]: { ...state.leadDetails[id], ...detail },
        },
      })),

      addActivity: (id, activity) => set((state) => {
        const leadDetail = state.leadDetails[id];
        if (!leadDetail) return state;

        const newActivity = {
          time: 'Just now',
          ...activity
        };

        return {
          leadDetails: {
            ...state.leadDetails,
            [id]: {
              ...leadDetail,
              timeline: [newActivity, ...leadDetail.timeline]
            }
          }
        };
      }),

      /**
       * Returns leads filtered by search query, stage, and status.
       */
      getFilteredLeads: () => {
        const state = get();
        return state.leads.filter((lead) => {
          const matchSearch = !state.searchQuery || 
            lead.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            lead.company.toLowerCase().includes(state.searchQuery.toLowerCase());
          
          const matchStage = !state.filterStage || lead.stage === state.filterStage;
          const matchStatus = !state.filterStatus || lead.status === state.filterStatus;
          
          return matchSearch && matchStage && matchStatus;
        });
      },

      /**
       * Returns filtered leads sorted by the current sort configuration.
       */
      getSortedLeads: () => {
        const filtered = get().getFilteredLeads();
        const { sortBy, sortOrder } = get();

        return [...filtered].sort((a, b) => {
          let aVal: any = '';
          let bVal: any = '';

          switch (sortBy) {
            case 'name': aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase(); break;
            case 'priority':
              const p = { High: 3, Medium: 2, Low: 1 };
              aVal = p[a.priority as keyof typeof p] || 0;
              bVal = p[b.priority as keyof typeof p] || 0;
              break;
            case 'updatedBy': aVal = (a.updatedBy || '').toLowerCase(); bVal = (b.updatedBy || '').toLowerCase(); break;
            case 'followUpAt': aVal = a.followUpAt; bVal = b.followUpAt; break;
            case 'createdAt': aVal = a.createdAt; bVal = b.createdAt; break;
            default: aVal = a.id; bVal = b.id; break;
          }

          if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
          if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      },
    }),
    {
      name: 'aurum-crm-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
