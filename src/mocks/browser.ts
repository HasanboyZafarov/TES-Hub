import { setupWorker } from "msw/browser";
import { auth_handlers } from "./handlers/auth";
import { profile_handlers } from "./handlers/profile";
import { content_handlers } from "./handlers/content";
import { contact_handlers } from "./handlers/contact";
import { handlers } from "./handlers/user";
import { learning_handlers } from "./handlers/learning";

export const worker = setupWorker(
  ...handlers,
  ...auth_handlers,
  ...profile_handlers,
  ...content_handlers,
  ...contact_handlers,
  ...learning_handlers,
);
