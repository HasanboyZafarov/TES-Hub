import { http, HttpResponse } from "msw";
import { endPoint } from "../../settings.json";

export const handlers = [
  http.post(endPoint + "/api/login", async ({ request }) => {
    const info = await request.formData();
    console.log(info);
  }),

  http.post(endPoint + "/api/signup", async ({ request }) => {
    const info = await request.formData();
    console.log(info);
  }),

  http.get(endPoint + "/api/auth", () => {
    return HttpResponse.json();
  }),
];
