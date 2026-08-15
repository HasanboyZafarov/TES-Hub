import type Course from "@/types/course";
import type { CourseLevel, CoursePerk } from "@/types/course";
import type CourseSection from "@/types/course-section";
import type Lesson from "@/types/lesson";
import type { Category } from "@/types/category";
import type Pricing from "@/types/pricing";
import type { EntityStatus } from "@/types/status";
import { slugify } from "@/lib/utils/session";

export const LEVEL_LABELS: Record<CourseLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const LESSON_TYPE_LABELS: Record<Lesson["type"], string> = {
  article: "Article",
  video: "Video",
  pdf: "Document",
  quiz: "Quiz",
  external_link: "External link",
};

export const PERK_LABELS: Record<CoursePerk, string> = {
  lifetime_access: "Lifetime Access",
  expert_forum: "Access to Private Expert Forum",
  downloadable_resources: "Downloadable Resources (PDFs, Templates)",
};

export interface CourseDraft {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  category: Category | "";
  level: CourseLevel | "";
  coverImage: string;
  sections: CourseSection[];
  priceModel: "free" | "one_time";
  amount: number | "";
  currency: Pricing["currency"];
  discountPercent: number | "";
  certificate: boolean;
  perks: CoursePerk[];
  /** Empty string means unlimited seats. */
  enrollmentLimit: number | "";
}

export const EMPTY_DRAFT: CourseDraft = {
  title: "",
  slug: "",
  shortDescription: "",
  longDescription: "",
  category: "",
  level: "",
  coverImage: "",
  sections: [],
  priceModel: "free",
  amount: "",
  currency: "KGS",
  discountPercent: "",
  certificate: true,
  perks: ["lifetime_access", "expert_forum"],
  enrollmentLimit: "",
};

export function draftFromCourse(course: Course): CourseDraft {
  return {
    title: course.title,
    slug: course.slug,
    shortDescription: course.shortDescription,
    longDescription: course.longDescription,
    category: course.category,
    level: course.level,
    coverImage: course.coverImage ?? "",
    sections: course.sections ?? [],
    priceModel: course.pricing.model === "free" ? "free" : "one_time",
    amount: course.pricing.amount ?? "",
    currency: course.pricing.currency,
    discountPercent: course.pricing.discountPercent ?? "",
    certificate: Boolean(course.certificateTemplate),
    perks: course.perks ?? [],
    enrollmentLimit: course.enrollmentLimit ?? "",
  };
}

export const totalLessons = (sections: CourseSection[]) =>
  sections.reduce((sum, s) => sum + s.lessons.length, 0);

export const totalMinutes = (sections: CourseSection[]) =>
  sections.reduce(
    (sum, s) =>
      sum + s.lessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0),
    0,
  );

/** "1h 45m" / "45 min" — matches the wording used across the academy pages. */
export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

export function buildCoursePayload(
  draft: CourseDraft,
  status: EntityStatus,
  authorId: string,
): Partial<Course> {
  const minutes = totalMinutes(draft.sections);
  const isPaid = draft.priceModel === "one_time";
  const hasDiscount = isPaid && Number(draft.discountPercent) > 0;

  return {
    title: draft.title.trim(),
    slug: draft.slug || slugify(draft.title),
    shortDescription: draft.shortDescription.trim(),
    longDescription: draft.longDescription,
    category: draft.category as Category,
    level: draft.level as CourseLevel,
    coverImage: draft.coverImage || undefined,
    sections: draft.sections.map((section, i) => ({
      ...section,
      order: i + 1,
      lessons: section.lessons.map((lesson, j) => ({
        ...lesson,
        order: j + 1,
      })),
    })),
    estimatedDurationHours: Math.round((minutes / 60) * 10) / 10,
    pricing: {
      model: isPaid ? "one_time" : "free",
      amount: isPaid ? Number(draft.amount) : undefined,
      currency: draft.currency,
      hasDiscount,
      discountPercent: hasDiscount ? Number(draft.discountPercent) : undefined,
      isRefundable: isPaid,
    },
    certificateTemplate: draft.certificate ? "tes-default" : undefined,
    completionThresholdPercent: 80,
    perks: draft.perks,
    enrollmentLimit:
      draft.enrollmentLimit === "" ? undefined : Number(draft.enrollmentLimit),
    visibility: status === "published" ? "public" : "hidden",
    status,
    authorId,
  };
}

/* --------------------------- id helpers --------------------------- */

let counter = 0;
const uid = (prefix: string) => `${prefix}-${Date.now()}-${counter++}`;

export const newSection = (order: number): CourseSection => ({
  id: uid("sec"),
  title: "",
  order,
  lessons: [],
});

export const newLesson = (order: number): Lesson => ({
  id: uid("les"),
  title: "",
  order,
  type: "video",
  durationMinutes: 10,
  isFreePreview: false,
});
