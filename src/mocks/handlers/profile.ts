import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import type User from "../../types/user";
import { endPoint } from "../../settings.json";
import userInterests from "../../lib/utils/interests";

export const roles = [
  "guest",
  "member",
  "verified_farmer",
  "spac_consultant",
  "tes_author",
  "tes_admin",
];

const postTypes = ["comment", "post"];

const i = Math.floor(Math.random() * roles.length);

const j = Math.floor(Math.random() * postTypes.length);

export const profile_handlers = [
  http.patch(`${endPoint}/profile/me`, async ({ request }) => {
    const body = (await request.json()) as Partial<User>;

    return HttpResponse.json<User>({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      username: body.username ?? faker.internet.username(),
      displayName: body.displayName ?? faker.person.fullName(),
      avatar: faker.image.avatar(),
      role: roles[i],
      bio: body.bio ?? "",
      region: { oblast: "Andijhan" },
      languages: (body.languages as User["languages"]) ?? ["en"],
      interests: userInterests,
      createdAt: new Date().toISOString(),
      isEmailVerified: true,
      isBanned: false,
      stats: {
        postsPublished: [
          {
            id: faker.number.int(),
            date: faker.date.anytime(),
            title: faker.lorem.sentence(2),
            message: faker.string.alpha(3),
            type: postTypes[j],
          },
        ],
        coursesCompleted: [
          {
            id: faker.number.int(),
            date: "today",
            title: faker.lorem.sentence(2),
            url: faker.internet.url(),
          },
        ],
        certificatesEarned: [
          {
            id: faker.number.int(),
            title: faker.word.words(3),
            date: faker.date.anytime(),
            url: faker.internet.url(),
          },
        ],
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
      bio: faker.lorem.paragraph({ min: 2, max: 3 }),
      region: { oblast: faker.location.city() },
      avatar: faker.image.avatar(),
      role: roles[i],
      languages: ["en", "ru", "ky"],
      interests: userInterests,
      createdAt: "today",
      isEmailVerified: true,
      isBanned: faker.datatype.boolean(),
      stats: {
        postsPublished: [
          {
            id: faker.number.int(),
            date: faker.date.anytime(),
            title: faker.lorem.sentence(2),
            message: faker.lorem.sentence(3),
            type: "post",
          },
        ],
        coursesCompleted: [
          {
            id: faker.number.int(),
            date: "today",
            title: faker.lorem.sentence(2),
            url: faker.internet.url(),
          },
        ],
        certificatesEarned: [
          {
            id: faker.number.int(),
            title: faker.word.words(3),
            date: faker.date.anytime(),
            url: faker.internet.url(),
          },
        ],
        followers: faker.number.int(),
        following: faker.number.int(),
      },
    });
  }),
];
