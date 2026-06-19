import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/user";
import { profile_handlers } from "./handlers/profile";

export const worker = setupWorker(...handlers, ...profile_handlers);
