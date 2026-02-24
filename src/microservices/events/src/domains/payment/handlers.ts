import type { EachMessagePayload } from 'kafkajs'
import { PAYMENT_EVENT_TYPES } from './topics.js'
import type { PaymentEvent, PaymentCreatedEvent } from './types.js'

async function handlePaymentCreated(event: PaymentCreatedEvent): Promise<void> {
  const { paymentId, amount } = event.data
  console.log(`[payment.created] Payment ${paymentId} created: ${amount}`)
}

export async function handlePaymentEvents(payload: EachMessagePayload): Promise<void> {
  const rawValue = payload.message.value?.toString()
  if (!rawValue) return

  try {
    const event = JSON.parse(rawValue) as PaymentEvent

    switch (event.type) {
      case PAYMENT_EVENT_TYPES.CREATED:
        await handlePaymentCreated(event)
        break
      default:
        console.warn(`[payment] Unhandled event type: ${(event as any).type}`)
    }
  } catch (error) {
    console.error('[payment] Failed to parse event', error)
  }
}
