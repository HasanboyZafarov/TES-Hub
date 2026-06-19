import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { endPoint } from "../../settings.json";

const data = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const handlers = [
  http.get(endPoint + "/api/users", () => {
    return HttpResponse.json(data);
  }),
];
