// ========================
// User & Auth Types
// ========================
export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatar?: string;
  nationalIdPhoto?: string;
  passportPhoto?: string;
  facePhoto?: string;
  createdAt: string;
}

export interface SignUpData {
  email: string;
  phone: string;
  password: string;
}

export interface VerificationStatus {
  nationalId: boolean;
  passport: boolean;
  face: boolean;
}

// ========================
// Contract Types
// ========================
export type ContractStatus =
  | 'draft'
  | 'active'
  | 'pending'
  | 'signed'
  | 'expired';
export type ContractType =
  | 'NDA'
  | 'SLA'
  | 'Partnership'
  | 'Employment'
  | 'Service';
export type DraftStatus = 'completed' | 'current' | 'pending';

export interface InvolvedParty {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  company: string;
}

export interface Draft {
  id: string;
  contractId: string;
  stepNumber: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: string;
  status: DraftStatus;
  content: string;
  contentAr: string;
  author: string;
}

export interface Contract {
  id: string;
  title: string;
  titleAr: string;
  companyName: string;
  companyLogo: string;
  type: ContractType;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  description: string;
  descriptionAr: string;
  involvedParties: InvolvedParty[];
  drafts: Draft[];
  value?: string;
  currency?: string;
}

// ========================
// Chat / Proposal Types
// ========================
export type ProposalStatus = 'accepted' | 'rejected' | 'pending' | 'counter';

export interface ProposalMessage {
  id: string;
  contractId: string;
  stepNumber: number;
  title: string;
  titleAr: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    company: string;
  };
  date: string;
  body: string;
  bodyAr: string;
  status: ProposalStatus;
  relatedDraftId?: string;
  attachments?: string[];
}

// ========================
// Navigation Types
// ========================
export interface ContractRouteParams {
  id: string;
}

export interface DraftRouteParams {
  id: string;
  draftId: string;
}
