import { h } from 'preact'

import { Meta } from '~/components/Meta'
import { Nav } from '~/components/Nav'

import { useRoute, useLoader } from '~/framework'

export async function load() {
  return {
    title: 'About',
  }
}

export function Component() {
  const route = useRoute()
  const data = useLoader<typeof load>()
  return (
    <>
      <Meta.Title>About</Meta.Title>
      <Nav />
      <h1>About</h1>
    </>
  )
}
