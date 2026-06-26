import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import type User from "../../types/user";
import { endPoint } from "../../settings.json";
import { roles } from "./profile";
import userInterests from "../../lib/utils/interests";

const i = Math.floor(Math.random() * roles.length);
const mockUser = (): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  username: faker.internet.username(),
  displayName: faker.person.fullName(),
  avatar: faker.image.avatar(),
  role: roles[i],
  bio: faker.lorem.sentence(),
  region: { oblast: "Andijhan" },
  languages: ["en"],
  interests: userInterests,
  createdAt: new Date().toISOString(),
  isEmailVerified: true,
  isBanned: faker.datatype.boolean({ probability: 0.5 }),
  stats: {
    postsPublished: [
      {
        id: faker.number.int(),
        date: faker.date.anytime(),
        title: faker.lorem.sentence(2),
        message: faker.lorem.sentence(3),
        type: "comment",
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

export const auth_handlers = [
  http.post(`${endPoint}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.password === "wrongpassword") {
      return HttpResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }
    return HttpResponse.json({
      token: faker.string.alphanumeric(64),
      user: mockUser(),
    });
  }),

  http.post(`${endPoint}/auth/signup`, async ({ request }) => {
    await request.json();
    return new HttpResponse(null, { status: 201 });
  }),

  http.post(`${endPoint}/auth/verify-email`, async ({ request }) => {
    const body = (await request.json()) as { email: string; code: string };
    if (body.code === "000000") {
      return HttpResponse.json(
        { message: "Invalid or expired code." },
        { status: 400 },
      );
    }
    return HttpResponse.json({
      token: faker.string.alphanumeric(64),
      user: mockUser(),
    });
  }),

  http.post(`${endPoint}/auth/verify-reset-code`, async ({ request }) => {
    const body = (await request.json()) as { email: string; code: string };
    if (body.code === "000000") {
      return HttpResponse.json(
        { message: "Invalid or expired code." },
        { status: 400 },
      );
    }
    return new HttpResponse(null, { status: 200 });
  }),

  http.post(`${endPoint}/auth/forgot-password`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.post(`${endPoint}/auth/resend-verification`, async () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.post(`${endPoint}/auth/reset-password`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      code: string;
      password: string;
    };
    if (body.code === "000000") {
      return HttpResponse.json(
        { message: "Reset code is invalid or expired." },
        { status: 400 },
      );
    }
    return new HttpResponse(null, { status: 200 });
  }),
];
