import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const data = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json(data);
  }),
];
