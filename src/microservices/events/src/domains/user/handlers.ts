import type { EachMessagePayload } from 'kafkajs'
import { USER_EVENT_TYPES } from './topics.js'
import type { UserEvent } from './types.js'

async function handleUserRegistered(event: UserEvent): Promise<void> {
  const { userId, email, username } = event.data
  console.log(`[user.registered] User ${username || email} (${userId}) registered`)
}

export async function handleUserEvents(payload: EachMessagePayload): Promise<void> {
  const rawValue = payload.message.value?.toString()
  if (!rawValue) return

  try {
    const event = JSON.parse(rawValue) as UserEvent

    switch (event.type) {
      case USER_EVENT_TYPES.REGISTERED:
        await handleUserRegistered(event)
        break
      default:
        console.warn(`[user] Unhandled event type: ${(event as any).type}`)
    }
  } catch (error) {
    console.error('[user] Failed to parse event', error)
  }
}
