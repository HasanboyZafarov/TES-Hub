import type BaseContent from "./base-content";
import type Pricing from "./pricing";

export default interface Session extends BaseContent {
  type: "session";
  description: string;
  format: "online" | "onsite";
  location?: string;
  meetingUrl?: string;
  startsAt: string;
  endsAt: string;
  hostId: string;
  capacity: number;
  registeredCount: number;
  pricing: Pricing;
  surface: "sessions";
}
