import { configure } from "hypobox";
import { Hono } from "hono";
import { serveStatic } from "hono/serve-static.module";

import { hypostyle } from "~/styles";
import { page } from "~/utils/page";

import { Page as Home } from "~/pages/Home";
import { Page as About } from "~/pages/About";
import { Page as NestedPage } from "~/pages/NestedPage";

/**
 * Configure hypobox to use the hypostyle instance.
 */
configure(hypostyle);

/**
 * Register routes
 */
export default new Hono()
  .use("/static/*", serveStatic({ root: "./" }))
  .all("/pages/:slug", page(NestedPage))
  .all("/about", page(About))
  .all("/", page(Home));
