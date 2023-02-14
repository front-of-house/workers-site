import { h } from "hyposcript";
import { Box } from "hypobox";

import { PageProps } from "~/utils/page";
import { Meta } from "~/components/Meta";
import { Nav } from "~/components/Nav";

export async function Page(props: PageProps) {
  return (
    <>
      <Meta.Title>Nested Page | Workers Site</Meta.Title>

      <Nav />

      <Box p={6}>
        <Box as="h1">Page: {props.params.slug}</Box>
      </Box>
    </>
  );
}
