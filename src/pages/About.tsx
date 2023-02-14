import { h } from "hyposcript";
import { Box } from "hypobox";

import { Meta } from "~/components/Meta";
import { Nav } from "~/components/Nav";

export async function Page() {
  return (
    <>
      <Meta.Title>About | Workers Site</Meta.Title>

      <Nav />

      <Box p={6}>
        <Box as="h1">About</Box>
      </Box>
    </>
  );
}
