import { h } from "hyposcript";
import { Box } from "hypobox";

export function Nav() {
  return (
    <Box f aic jcb p={6}>
      <Box f aic>
        <Box as="a" href="/" mr={4}>
          Home
        </Box>
        <Box as="a" href="/about" mr={4}>
          About
        </Box>
        <Box as="a" href="/pages/foo" mr={4}>
          Foo
        </Box>
      </Box>

      <Box
        as="a"
        href="https://github.com/front-of-house/workers-site"
        target="_blank"
      >
        <Box
          as="img"
          src="https://hicon.foh.workers.dev/radix/github-logo.svg?fill=blue"
          w="20px"
        />
      </Box>
    </Box>
  );
}
