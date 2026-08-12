import type BaseContent from "./base-content";
import type Pricing from "./pricing";

export const SESSION_FORMATS = ["online", "onsite", "hybrid"] as const;
export type SessionFormat = (typeof SESSION_FORMATS)[number];

export const SESSION_TYPES = [
  "webinar",
  "workshop",
  "field_day",
  "clinic",
  "recorded_course",
] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

export interface AgendaItem {
  id: string;
  startsAt: string; // "09:00"
  endsAt: string; // "10:30"
  title: string;
  description?: string;
}

export const MATERIAL_KINDS = ["pdf", "excel", "video", "link"] as const;
export type MaterialKind = (typeof MATERIAL_KINDS)[number];

export interface SessionMaterial {
  id: string;
  name: string;
  kind: MaterialKind;
  size?: string; // "2.4 MB"
  url?: string;
  locked: boolean; // unlocked after registration
}

export default interface Session extends BaseContent {
  type: "session";
  description: string;
  format: SessionFormat;
  sessionType: SessionType;
  location?: string;
  venueAddress?: string;
  meetingUrl?: string;
  startsAt: string;
  endsAt: string;
  registrationClosesAt?: string;
  hostId: string;
  capacity: number;
  registeredCount: number;
  pricing: Pricing;
  agenda?: AgendaItem[];
  materials?: SessionMaterial[];
  isCanceled?: boolean;
  surface: "sessions";
}
