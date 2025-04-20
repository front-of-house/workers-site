import { Hono } from 'hono'

import { route } from '~/framework'

import * as Home from '~/routes/Home'
import * as About from '~/routes/About'

/**
 * Register routes
 */
export default new Hono()
  .all('/', ...route(Home))
  .all('/about', ...route(About))
