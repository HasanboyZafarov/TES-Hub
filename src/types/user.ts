import type Region from "./region";
import type Badge from "./badge";
import type postsPublished from "./postsPublished";
import type coursesCompleted from "./coursesCompleted";
import type certificatesEarned from "./certificatesEarned";
export default interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: string;
  bio?: string;
  region?: Region;
  languages: ("ru" | "ky" | "en")[];
  interests: string[]; // tag IDs
  createdAt: string; // ISO
  isEmailVerified: boolean;
  isBanned: boolean;
  badges?: Badge[];
  stats: {
    postsPublished: postsPublished[];

    coursesCompleted: coursesCompleted[];

    certificatesEarned: certificatesEarned[];
    followers: number;
    following: number;
  };
}
