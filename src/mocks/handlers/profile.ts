import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import type User from "../../types/user";
import { endPoint } from "../../settings.json";
export const profile_handlers = [
  http.get(endPoint + "/profile/me", () => {
    return HttpResponse.json<User>({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      username: faker.internet.username(),
      displayName: faker.internet.displayName(),
      avatar: faker.image.avatar(),
      role: "tes_admin",
      languages: ["en", "ru", "ky"],
      interests: ["hello"],
      createdAt: "today",
      isEmailVerified: true,
      isBanned: false,
      stats: {
        postsPublished: 0,
        coursesCompleted: 0,
        certificatesEarned: 0,
        followers: 0,
        following: 0,
      },
    });
  }),
];
