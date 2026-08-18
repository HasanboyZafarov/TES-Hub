import type { Category } from "./category";
import type Region from "./region";

export const RESOURCE_TYPES = [
  "guide",
  "template",
  "dataset",
  "toolkit",
  "video",
  "link",
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export default interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  category: Category;
  language: "ru" | "ky" | "en";
  /** Files served by TES. Undefined for `link` resources. */
  fileUrl?: string;
  fileName?: string;
  sizeKb?: number;
  /** Set for `link` and `video` resources hosted elsewhere. */
  externalUrl?: string;
  updatedAt: string;
  downloadCount: number;
  tags: string[];
  region?: Region;
  /** Members-only downloads prompt a sign-in first. */
  requiresAuth: boolean;
  isFeatured?: boolean;
}
