import { Hono } from 'hono'
import { publishPaymentEvent } from '../../services/eventPublisher.js'
import { PAYMENT_EVENT_TYPES } from './topics.js'
import type { PaymentEventRequest, PaymentEvent } from './types.js'

const app = new Hono()

app.post('/', async (c) => {
  try {
    const body = await c.req.json<PaymentEventRequest>()
    const { payment_id, user_id, amount, status, timestamp, method_type } = body

    let event: PaymentEvent | null = null

    event = {
      type: PAYMENT_EVENT_TYPES.CREATED,
      data: {
        paymentId: payment_id,
        userId: user_id,
        amount,
        status,
        timestamp,
        methodType: method_type,
      },
    }

    await publishPaymentEvent(String(payment_id), event)
    return c.json({
      status: 'success',
      event,
    }, 201)
  } catch (error) {
    console.error('Failed to process payment event:', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

export const paymentRoutes = app
