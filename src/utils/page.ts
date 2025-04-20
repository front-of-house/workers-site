import { Hono } from "hono";
import merge from "deepmerge";
import { html, DocumentProperties } from "@presta/html";

import { flush as flushMeta } from "~/components/Meta";

export type PageProps = {
  params: Record<string, string>;
  query: Record<string, string>;
};

export function page(
  component: (props: PageProps) => Promise<string>,
  documentProperties: DocumentProperties = {},
  responseOptions: ResponseInit = {}
): Parameters<Hono["all"]>[1] {
  return async (c) => {
    const params = c.req.param();
    const query = c.req.query();
    const body = await component({ params, query });
    const head = flushMeta();
    const document = html(
      merge(documentProperties, {
        head: {
          ...head,
        },
        body,
        foot: {
          script: [{ src: "/static/index.js" }],
        },
      })
    );

    return new Response(document, {
      status: responseOptions.status || 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  };
}
