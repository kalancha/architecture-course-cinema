import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { connectProducer, disconnectProducer, startConsumer, disconnectConsumer } from './infra/kafka/index.js'
import { movieRoutes } from './domains/movie/index.js'
import { userRoutes } from './domains/user/index.js'
import { paymentRoutes } from './domains/payment/index.js'

const app = new Hono()

const port = Number(process.env.PORT) || 8082

app.get('/api/events/health', (c) => c.json({ status: true }))

app.route('/api/events/movie', movieRoutes)
app.route('/api/events/user', userRoutes)
app.route('/api/events/payment', paymentRoutes)

async function start() {
  await connectProducer()
  await startConsumer()

  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Events service is running on http://localhost:${info.port}`)
  })
}

start().catch((err) => {
  console.error('Failed to start events service:', err)
  process.exit(1)
})

process.on('SIGTERM', async () => {
  await disconnectConsumer()
  await disconnectProducer()
  process.exit(0)
})
