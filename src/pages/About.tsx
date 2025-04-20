import { h } from "hyposcript";

import { Meta } from "~/components/Meta";
import { Nav } from "~/components/Nav";

export async function Page() {
  return (
    <>
      <Meta.Title>Workers Site</Meta.Title>
      <Nav />
      <h1>Abount</h1>
    </>
  );
}
