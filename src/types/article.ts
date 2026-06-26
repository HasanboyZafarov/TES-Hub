import type BaseContent from "./base-content";
import type Pricing from "./pricing";

export default interface Article extends BaseContent {
  type: "article";
  body: string; // TipTap JSON or HTML
  excerpt: string;
  readTimeMinutes: number;
  pricing: Pricing;
  surface: "academy";
  isVerifiedByTES: true; // articles are always Academy/Verified
}
