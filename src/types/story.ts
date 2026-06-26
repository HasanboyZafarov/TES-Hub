import type BaseContent from "./base-content";

export default interface Story extends BaseContent {
  type: "story";
  body: string;
  excerpt: string;
  surface: "community";
  isVerifiedByTES: boolean; // can be stamped by TES Expert
}
