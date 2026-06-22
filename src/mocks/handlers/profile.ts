import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import type User from "../../types/user";
import { endPoint } from "../../settings.json";
export const profile_handlers = [
  http.patch(`${endPoint}/profile/me`, async ({ request }) => {
    const body = (await request.json()) as Partial<User>;

    return HttpResponse.json<User>({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      username: body.username ?? faker.internet.username(),
      displayName: body.displayName ?? faker.person.fullName(),
      avatar: faker.image.avatar(),
      role: "member",
      bio: body.bio ?? "",
      region: body.region,
      languages: (body.languages as User["languages"]) ?? ["en"],
      interests: body.interests ?? ["hello", "test"],
      createdAt: new Date().toISOString(),
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

  http.get<{ id: string }>(endPoint + "/profile/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json<User>({
      id: id,
      email: faker.internet.email(),
      username: faker.internet.username(),
      displayName: faker.internet.displayName(),
      bio: faker.person.bio(),
      avatar: faker.image.avatar(),
      role: "tes_admin",
      languages: ["en", "ru", "ky"],
      interests: ["hello", "test"],
      createdAt: "today",
      isEmailVerified: true,
      isBanned: faker.datatype.boolean(),
      stats: {
        postsPublished: faker.number.int(),
        coursesCompleted: faker.number.int(),
        certificatesEarned: faker.number.int(),
        followers: faker.number.int(),
        following: faker.number.int(),
      },
    });
  }),
];
