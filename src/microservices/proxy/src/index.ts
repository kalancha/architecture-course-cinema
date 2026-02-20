import { Hono } from 'hono'
import { registerMonolithRoutes } from './handlers/registerMonolithRoutes'
import { registerMoviesRoutes } from './handlers/registerMoviesRoutes'
import { registerEventsRoutes } from './handlers/registerEventsRoutes'

const app = new Hono()

app.get('/health', (c) => {
  console.log('Health check')
  return c.json({ status: 'ok' })
})

registerEventsRoutes(app)
registerMoviesRoutes(app)
registerMonolithRoutes(app)

export default {
  port: process.env.PORT || 8000,
  hostname: process.env.HOST || '0.0.0.0',
  fetch: app.fetch,
}
