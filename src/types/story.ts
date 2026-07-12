import type BaseContent from "./base-content";

export interface StoryAuthor {
  name: string;
  avatar?: string;
  isVerified: boolean; // verified_farmer badge on the author
}

export default interface Story extends BaseContent {
  type: "story";
  body: string;
  excerpt: string;
  surface: "community";
  isVerifiedByTES: boolean; // can be stamped by TES Expert
  isPremium: boolean; // gated to verified farmers
  author: StoryAuthor;
}
