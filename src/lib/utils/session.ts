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

// Values are i18n keys — render them through `t()`.
export const SESSION_TYPE_KEYS: Record<SessionType, string> = {
  webinar: "session.type.webinar",
  workshop: "session.type.workshop",
  field_day: "session.type.field_day",
  clinic: "session.type.clinic",
  recorded_course: "session.type.recorded_course",
};

export const SESSION_FORMAT_KEYS: Record<SessionFormat, string> = {
  online: "session.format.online",
  onsite: "session.format.onsite",
  hybrid: "session.format.hybrid",
};

export const MATERIAL_KIND_KEYS: Record<MaterialKind, string> = {
  pdf: "session.material.pdf",
  excel: "session.material.excel",
  video: "session.material.video",
  link: "session.material.link",
};

export function capacityPercent(registered: number, capacity: number) {
  if (!capacity) return 0;
  return Math.min(100, Math.round((registered / capacity) * 100));
}

export function priceLabel(
  pricing: Session["pricing"],
  t: (key: string) => string,
) {
  if (pricing.model === "free" || !pricing.amount) return t("session.free");
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
