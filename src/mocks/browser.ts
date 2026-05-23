import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/user";

export const worker = setupWorker(...handlers);
