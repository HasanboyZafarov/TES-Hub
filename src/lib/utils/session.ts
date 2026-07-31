import type Session from "@/types/session";
import type { MaterialKind, SessionFormat, SessionType } from "@/types/session";

export type SessionLifecycle = "live" | "upcoming" | "completed" | "canceled";

export function getLifecycle(
  s: Pick<Session, "startsAt" | "endsAt" | "isCanceled">,
  now: number = Date.now(),
): SessionLifecycle {
  if (s.isCanceled) return "canceled";
  const start = new Date(s.startsAt).getTime();
  const end = new Date(s.endsAt).getTime();
  if (now >= start && now <= end) return "live";
  if (now < start) return "upcoming";
  return "completed";
}

export const SESSION_TYPE_LABELS: Record<SessionType, string> = {
  webinar: "Live Webinar",
  workshop: "Workshop",
  field_day: "Field Day",
  clinic: "In-Person Clinic",
  recorded_course: "Recorded Course",
};

export const SESSION_FORMAT_LABELS: Record<SessionFormat, string> = {
  online: "Online (Zoom)",
  onsite: "Offline (In-Person)",
  hybrid: "Hybrid",
};

export const MATERIAL_KIND_LABELS: Record<MaterialKind, string> = {
  pdf: "PDF",
  excel: "Excel",
  video: "Video",
  link: "Link",
};

export function capacityPercent(registered: number, capacity: number) {
  if (!capacity) return 0;
  return Math.min(100, Math.round((registered / capacity) * 100));
}

export function priceLabel(pricing: Session["pricing"]) {
  if (pricing.model === "free" || !pricing.amount) return "Free";
  return `${pricing.amount} ${pricing.currency}`;
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function isSameDay(iso: string, ref: Date = new Date()) {
  const d = new Date(iso);
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth() &&
    d.getDate() === ref.getDate()
  );
}
