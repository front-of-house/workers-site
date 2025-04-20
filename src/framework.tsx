import { createFactory } from 'hono/factory'
import { JSX, createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { renderToString } from 'preact-render-to-string'
import merge from 'deepmerge'

export type RouteContext = {
  params: Record<string, string>
  query: Record<string, string>
}
export type RouteLoad = (props: RouteContext) => Promise<unknown>
export type RouteComponent = () => JSX.Element
export type Route = {
  load?: RouteLoad
  Component: RouteComponent
}

const RouteContext = createContext<RouteContext>({
  params: {},
  query: {},
})
export function useRoute() {
  return useContext(RouteContext)
}

const RouteLoaderContext = createContext<unknown>(undefined)
export function useLoader<
  T extends (props: RouteContext) => Promise<unknown>,
>() {
  return useContext(RouteLoaderContext) as Awaited<ReturnType<T>>
}

const RouteMetaContext = createContext<Partial<MetaTags>>({})
export function useMeta() {
  return useContext(RouteMetaContext)
}

export function route(route: Route) {
  return createFactory().createHandlers(async (c) => {
    const params = c.req.param()
    const query = c.req.query()
    const { load, Component } = route
    const context: RouteContext = {
      params,
      query,
    }
    const data = load ? await load(context) : undefined
    const meta = {}
    const body = renderToString(
      <RouteContext.Provider value={context}>
        <RouteLoaderContext.Provider value={data}>
          <RouteMetaContext.Provider value={meta}>
            <Component />
          </RouteMetaContext.Provider>
        </RouteLoaderContext.Provider>
      </RouteContext.Provider>,
    )

    const document = `
    <html>
      <head>
        ${createMetaTags(meta)}
      </head>
      <body>
        ${body}
      </body>
    </html>
    `

    return new Response(document, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    })
  })
}

type GenericObject = { [key: string]: any }

export type HeadElementWithChildren<T> = {
  children?: string
} & T

export type Meta = Partial<Omit<HTMLMetaElement, 'children'>> | string
export type Link = Partial<Omit<HTMLLinkElement, 'children'>> | string
export type Style =
  | Partial<HeadElementWithChildren<Omit<HTMLStyleElement, 'children'>>>
  | string
export type Script =
  | Partial<HeadElementWithChildren<Omit<HTMLScriptElement, 'children'>>>
  | string
export type HeadElement = Meta | Link | Style | Script

type Social = {
  title?: string
  description?: string
  image?: string
  url?: string
  [key: string]: string | undefined
}

export type MetaTags = {
  title: string
  description: string
  image: string
  url: string
  og: Social
  twitter: Social
  meta: Meta[]
  link: Link[]
  script: Script[]
  style: Style[]
}

export type DocumentProperties = {
  body?: string
  head?: Partial<MetaTags>
  foot?: Partial<Pick<MetaTags, 'script' | 'style'>>
  htmlAttributes?: Partial<{ [key in keyof HTMLHtmlElement]: string }>
  bodyAttributes?: Partial<HTMLBodyElement>
}

const defaults: MetaTags = {
  title: 'Presta',
  description: '',
  image: '',
  url: '',
  og: {},
  twitter: {},
  meta: [
    // @ts-ignore
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  ],
  link: [],
  script: [],
  style: [],
}

export function pruneEmpty(obj: GenericObject) {
  let res: GenericObject = {}

  for (const k of Object.keys(obj)) {
    if (!!obj[k]) res[k] = obj[k]
  }

  return res
}

export function filterUnique(arr: HeadElement[]) {
  let res: HeadElement[] = []

  outer: for (const a of arr.reverse()) {
    for (const r of res) {
      if (typeof a === 'string' || typeof r === 'string') {
        if (a === r) continue outer
      } else {
        // @ts-ignore
        if (a.name && a.name === r.name) continue outer
        // @ts-ignore
        if (a.src && a.src === r.src) continue outer
        // @ts-ignore
        if (a.href && a.href === r.href) continue outer
      }
    }

    res.push(a)
  }

  return res.reverse()
}

export function tag(name: string) {
  return (props: HeadElement) => {
    if (typeof props === 'string') return props

    const attr = Object.keys(props)
      .filter((p) => p !== 'children')
      // @ts-ignore
      .map((p) => `${p}="${props[p]}"`)
      .join(' ')

    const attributes = attr ? ' ' + attr : ''

    if (/script|style/.test(name)) {
      // @ts-ignore
      return `<${name}${attributes}>${props.children || ''}</${name}>`
    } else {
      return `<${name}${attributes} />`
    }
  }
}

export function prefixToObjects(
  prefix: string,
  props: Social,
): HeadElementWithChildren<Partial<HTMLMetaElement>>[] {
  return Object.keys(props).map((p) => ({
    [prefix === 'og' ? 'property' : 'name']: `${prefix}:${p}`,
    content: props[p],
  }))
}

export function createMetaTags(config: Partial<MetaTags> = {}) {
  const { title, description, image, url, ...o } = merge(defaults, config)

  const meta = o.meta ? filterUnique(o.meta) : []
  const link = o.link ? filterUnique(o.link) : []
  const script = o.script ? filterUnique(o.script) : []
  const style = o.style ? filterUnique(o.style) : []
  const og = pruneEmpty({
    title,
    description,
    url,
    image,
    ...(o.og || {}),
  })
  const twitter = pruneEmpty({
    title,
    description,
    url,
    image,
    ...(o.twitter || {}),
  })

  const tags = [
    meta
      .concat(description ? { name: 'description', content: description } : [])
      .map(tag('meta')),
    prefixToObjects('og', og).map(tag('meta')),
    prefixToObjects('twitter', twitter).map(tag('meta')),
    link.map(tag('link')),
    script.map(tag('script')),
    style.map(tag('style')),
  ].flat(2)

  return `<title>${title}</title>${tags.join('')}`
}
