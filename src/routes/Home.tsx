import { h } from 'preact'

import { Meta } from '~/components/Meta'
import { Nav } from '~/components/Nav'

export function Component() {
  return (
    <>
      <Meta.Title>Workers Site</Meta.Title>
      <Nav />
      <h1>Home</h1>
    </>
  )
}
