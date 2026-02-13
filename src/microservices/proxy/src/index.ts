import { Hono } from 'hono'
import { registerMonolithRoutes } from './handlers/registerMonolithRoutes'
import { registerMoviesRoutes } from './handlers/registerMoviesRoutes'

const app = new Hono()

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

registerMoviesRoutes(app)
registerMonolithRoutes(app)

export default {
  port: process.env.PORT || 8000,
  fetch: app.fetch,
}
