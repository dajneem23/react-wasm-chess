// from https://github.com/mswjs/examples/blob/master/examples/with-jest/src/mocks/server.js
import { setupServer } from "msw/node";

import { handlers } from "./handlers.ts";

export const server = setupServer(...handlers);
