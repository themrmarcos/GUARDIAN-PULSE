
export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  EMERGENCY = 'EMERGENCY',
  COMMUNICATION = 'COMMUNICATION',
  UTILITIES = 'UTILITIES',
  AI_TOOLS = 'AI_TOOLS',
  RESOURCES = 'RESOURCES',
  MAPS = 'MAPS'
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  isEmergency: boolean;
}

export interface EmergencyLog {
  id: string;
  timestamp: number;
  type: string;
  location?: { lat: number; lng: number };
}

export interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: string;
}
