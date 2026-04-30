export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Follow-up Pending'
  | 'Interested'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Closed Won'
  | 'Closed Lost';

export type PipelineStage =
  | 'New Lead'
  | 'Initial Contact'
  | 'Follow-up'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Converted'
  | 'Lost';

export type Lead = {
  id: string;
  name: string;
  company: string;
  role: string;
  source: string;
  country: string;
  score: number;
  lastReach: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  linkedIn?: string;
  stage: PipelineStage;
  status: LeadStatus;
  owner: string;
  city: string;
  priority: 'High' | 'Medium' | 'Low';
  nextAction: string;
  followUpAt: string;
  missingFields: string[];
  createdAt: string;
  updatedBy?: string;
  lastContacted?: string;
};

export type LeadTimelineItem = {
  time: string;
  title: string;
  detail: string;
  kind: 'activity' | 'communication' | 'assignment' | 'note';
};

export type LeadDetail = Lead & {
  notes: string[];
  attachments: string[];
  timeline: LeadTimelineItem[];
};

// Seed data keeps the UI useful before API and database wiring is added.
export const leads: Lead[] = [
  {
    id: 'L-1001',
    name: 'Aarav Mehta',
    company: 'Northstar Health',
    role: 'Operations Head',
    source: 'Website form',
    country: 'Thailand',
    score: 43,
    lastReach: '3 hours ago',
    email: 'aarav.mehta@northstarhealth.com',
    phone: '+91 98421 10011',
    whatsapp: '+91 98421 10011',
    website: 'northstarhealth.com',
    linkedIn: 'linkedin.com/in/aaravmehta',
    stage: 'Proposal Sent',
    status: 'Interested',
    owner: 'Maya',
    city: 'Bengaluru',
    priority: 'High',
    nextAction: 'Send revised proposal and follow up by 4:30 PM',
    followUpAt: 'Today 4:30 PM',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    missingFields: ['Phone', 'WhatsApp'],
    updatedBy: 'Maya',
    lastContacted: 'Today 11:20 AM',
  },
  {
    id: 'L-1002',
    name: 'Priya Nair',
    company: 'BlueCrest Logistics',
    role: 'Managing Director',
    source: 'LinkedIn',
    country: 'Korea',
    score: 39,
    lastReach: '5 hours ago',
    email: 'priya.nair@bluecrestlogistics.com',
    phone: '+91 90002 22002',
    whatsapp: '+91 90002 22002',
    website: 'bluecrestlogistics.com',
    linkedIn: 'linkedin.com/in/priyanair',
    stage: 'Qualified',
    status: 'Follow-up Pending',
    owner: 'Arjun',
    city: 'Chennai',
    priority: 'Medium',
    nextAction: 'Confirm demo slot and collect missing email',
    followUpAt: 'Tomorrow 10:00 AM',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    missingFields: ['Email'],
    updatedBy: 'Arjun',
    lastContacted: 'Yesterday 5:40 PM',
  },
  {
    id: 'L-1003',
    name: 'Karthik Subramanian',
    company: 'AstraForge',
    role: 'Founder',
    source: 'Referral',
    country: 'Singapore',
    score: 41,
    lastReach: '10 hours ago',
    email: 'karthik@astraforge.in',
    phone: '+91 94444 33003',
    whatsapp: '+91 94444 33003',
    website: 'astraforge.in',
    linkedIn: 'linkedin.com/in/karthiksubramanian',
    stage: 'Negotiation',
    status: 'Contacted',
    owner: 'Rohan',
    city: 'Coimbatore',
    priority: 'High',
    nextAction: 'Finalize pricing and approvals',
    followUpAt: 'Today 6:15 PM',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    missingFields: [],
    updatedBy: 'Rohan',
    lastContacted: 'Today 9:05 AM',
  },
  {
    id: 'L-1004',
    name: 'Sneha Kapoor',
    company: 'Crestline Studios',
    role: 'Creative Director',
    source: 'Outbound email',
    country: 'Vietnam',
    score: 37,
    lastReach: '60 days ago',
    email: 'sneha@crestlinestudios.com',
    phone: '+91 95555 44004',
    whatsapp: '+91 95555 44004',
    website: 'crestlinestudios.com',
    linkedIn: 'linkedin.com/in/snehakapoor',
    stage: 'Initial Contact',
    status: 'New',
    owner: 'Maya',
    city: 'Hyderabad',
    priority: 'Low',
    nextAction: 'Send intro note and WhatsApp template',
    followUpAt: 'Today 8:00 PM',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    missingFields: ['Designation', 'Phone'],
    updatedBy: 'Maya',
    lastContacted: 'Today 8:40 AM',
  },
];

export const leadDetails: Record<string, LeadDetail> = {
  'L-1001': {
    ...leads[0],
    notes: [
      'Decision makers want the final proposal in a shorter summary format.',
      'Budget is approved subject to implementation timeline confirmation.',
    ],
    attachments: ['Proposal-v3.pdf', 'Discovery-notes.docx', 'Billing-sheet.xlsx'],
    timeline: [
      { time: 'Today 11:20 AM', title: 'Proposal revised', detail: 'Maya updated pricing and sent the revised deck.', kind: 'activity' },
      { time: 'Today 10:05 AM', title: 'WhatsApp message', detail: 'Template sent with a direct scheduling request.', kind: 'communication' },
      { time: 'Yesterday 4:40 PM', title: 'Assigned to Maya', detail: 'Lead moved into Maya’s queue after manager review.', kind: 'assignment' },
      { time: 'Yesterday 2:10 PM', title: 'Internal note', detail: 'Follow-up should focus on implementation speed and support coverage.', kind: 'note' },
    ],
  },
  'L-1002': {
    ...leads[1],
    notes: [
      'Needs a fast demo and a concise implementation outline.',
      'Ask for direct email confirmation before sending documents.',
    ],
    attachments: ['Demo-agenda.pdf', 'Use-cases.docx'],
    timeline: [
      { time: 'Today 9:15 AM', title: 'Demo scheduled', detail: 'Calendar invite prepared for tomorrow morning.', kind: 'activity' },
      { time: 'Yesterday 5:40 PM', title: 'Call logged', detail: '15-minute qualification call completed.', kind: 'communication' },
      { time: 'Yesterday 5:05 PM', title: 'Follow-up reminder', detail: 'Reminder set for email confirmation and demo prep.', kind: 'activity' },
    ],
  },
  'L-1003': {
    ...leads[2],
    notes: [
      'Negotiation stage depends on approval from finance and operations.',
      'Value expansion is possible if support response SLA is included.',
    ],
    attachments: ['Pricing-v2.xlsx', 'Agreement-markup.pdf'],
    timeline: [
      { time: 'Today 9:05 AM', title: 'Owner updated', detail: 'Rohan reviewed the proposed discount structure.', kind: 'assignment' },
      { time: 'Yesterday 6:20 PM', title: 'Email response', detail: 'Client asked for pricing justification and support tiers.', kind: 'communication' },
      { time: 'Yesterday 3:10 PM', title: 'Negotiation note', detail: 'Competitor comparison added to the record.', kind: 'note' },
    ],
  },
  'L-1004': {
    ...leads[3],
    notes: [
      'Missing phone number should be completed before the next follow-up.',
      'Creative director prefers short message-first communication.',
    ],
    attachments: ['Intro-message.txt'],
    timeline: [
      { time: 'Today 8:40 AM', title: 'Lead captured', detail: 'Imported from outbound campaign list.', kind: 'activity' },
      { time: 'Today 8:25 AM', title: 'Intro email sent', detail: 'Personalized introduction with WhatsApp CTA.', kind: 'communication' },
      { time: 'Today 8:15 AM', title: 'Missing data flagged', detail: 'Phone and role should be completed by the assigned rep.', kind: 'note' },
    ],
  },
};

export function getLeadById(id: string) {
  return leadDetails[id];
}

export const pipeline = [
  { stage: 'New Lead', count: 18, hue: 'from-amber-300/20 to-amber-500/5' },
  { stage: 'Initial Contact', count: 12, hue: 'from-sky-300/20 to-sky-500/5' },
  { stage: 'Follow-up', count: 9, hue: 'from-cyan-300/20 to-cyan-500/5' },
  { stage: 'Qualified', count: 8, hue: 'from-emerald-300/20 to-emerald-500/5' },
  { stage: 'Proposal Sent', count: 6, hue: 'from-violet-300/20 to-violet-500/5' },
  { stage: 'Negotiation', count: 4, hue: 'from-fuchsia-300/20 to-fuchsia-500/5' },
  { stage: 'Converted', count: 3, hue: 'from-lime-300/20 to-lime-500/5' },
  { stage: 'Lost', count: 5, hue: 'from-stone-300/20 to-stone-500/5' },
];

export const dashboardMetrics = [
  { label: 'Total leads', value: '248', delta: '+18 this week', tone: 'text-foreground' },
  { label: 'Hot leads', value: '37', delta: '+6 qualified today', tone: 'text-amber-300' },
  { label: 'Pending follow-ups', value: '21', delta: '7 overdue', tone: 'text-sky-300' },
  { label: 'Converted this month', value: '14', delta: '+22% vs last month', tone: 'text-emerald-300' },
];

export const activityFeed = [
  { time: '08:42', title: 'Lead imported from CSV', detail: '22 records matched existing duplicates and were merged.' },
  { time: '09:15', title: 'WhatsApp template sent', detail: 'Maya sent a follow-up to Northstar Health with placeholders resolved.' },
  { time: '10:05', title: 'Overdue reminder triggered', detail: '2 leads crossed the follow-up threshold and were escalated to the manager.' },
  { time: '11:20', title: 'Field enrichment completed', detail: 'Sales executive updated missing phone and designation data for assigned leads.' },
];