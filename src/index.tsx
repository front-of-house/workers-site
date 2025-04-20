import { Hono } from "hono";

import { page } from "~/utils/page";

import { Page as Home } from "~/pages/Home";
import { Page as About } from "~/pages/About";

/**
 * Register routes
 */
export default new Hono()
  .all("/about", page(About))
  .all("/", page(Home));
