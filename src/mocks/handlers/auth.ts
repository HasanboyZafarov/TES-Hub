import { http, HttpResponse } from "msw";
import { endPoint } from "../../settings.json";
import users from "../data/users";

const randomToken = () => crypto.randomUUID().replace(/-/g, "");

const randomUser = () => users[Math.floor(Math.random() * users.length)];

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
      token: randomToken(),
      user: users.find((u) => u.email === body.email) ?? randomUser(),
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
      token: randomToken(),
      user: randomUser(),
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
