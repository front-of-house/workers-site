import { useMeta } from '~/framework'

export function Title({ children }: { children: string }) {
  const meta = useMeta()
  meta.title = children
  return null
}

export function Description({ content }: { content: string }) {
  const meta = useMeta()
  meta.description = content
  return null
}

export function Image({ content }: { content: string }) {
  const meta = useMeta()
  meta.image = content
  return null
}

export const Meta = {
  Title,
  Description,
  Image,
}
