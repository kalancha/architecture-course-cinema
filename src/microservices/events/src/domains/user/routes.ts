import { Hono } from 'hono'
import { publishUserEvent } from '../../services/eventPublisher.js'
import { USER_EVENT_TYPES } from './topics.js'
import type { UserEvent, UserEventRequest } from './types.js'

const app = new Hono()

app.post('/', async (c) => {
  try {
    const body = await c.req.json<UserEventRequest>()
    const { user_id, action, timestamp, username, email } = body

    const event: UserEvent = {
      type: USER_EVENT_TYPES.REGISTERED,
      data: {
        userId: user_id,
        action,
        timestamp,
        username,
        email,
      },
    }

    await publishUserEvent(String(user_id), event)

    return c.json({
      status: 'success',
      event,
    }, 201)
  } catch (error) {
    console.error('Failed to process user event:', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

export const userRoutes = app
