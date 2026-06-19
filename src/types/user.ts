import type Region from "./region";
import type Badge from "./badge";

export default interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role:
    | "guest"
    | "member"
    | "verified_farmer"
    | "spac_consultant"
    | "tes_author"
    | "tes_admin";
  bio?: string;
  region?: Region;
  languages: ("ru" | "ky" | "en")[];
  interests: string[]; // tag IDs
  createdAt: string; // ISO
  isEmailVerified: boolean;
  isBanned: boolean;
  badges?: Badge[];
  stats: {
    postsPublished: number;
    coursesCompleted: number;
    certificatesEarned: number;
    followers: number;
    following: number;
  };
}
