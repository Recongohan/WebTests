export type Role = 'Admin' | 'Lead' | 'Developer';

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  role: Role;
  totpSecret?: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string;
  completed: boolean;
  leadId?: number;
  developerIds: number[];
  documents: string[];
}
