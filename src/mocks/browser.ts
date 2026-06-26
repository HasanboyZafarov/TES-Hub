import { setupWorker } from "msw/browser";
import { auth_handlers } from "./handlers/auth";
import { profile_handlers } from "./handlers/profile";
import { handlers } from "./handlers/user";

export const worker = setupWorker(...handlers, ...auth_handlers, ...profile_handlers);
