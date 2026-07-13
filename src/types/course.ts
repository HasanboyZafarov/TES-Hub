import type BaseContent from "./base-content";
import type { Category } from "./category";
import type CourseSection from "./course-section";
import type Pricing from "./pricing";

export default interface Course extends BaseContent {
  type: "course";
  category: Category;
  visibility: "public" | "unlisted" | "hidden";
  shortDescription: string;
  longDescription: string;
  level: "beginner" | "intermediate" | "advanced";
  estimatedDurationHours: number;
  sections: CourseSection[];
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  pricing: Pricing;
  certificateTemplate?: string;
  completionThresholdPercent: number;
  surface: "academy";
}
