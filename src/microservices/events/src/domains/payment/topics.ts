export const PAYMENT_EVENT_TYPES = {
  CREATED: 'payment.created'
} as const

export type PaymentEventType = (typeof PAYMENT_EVENT_TYPES)[keyof typeof PAYMENT_EVENT_TYPES]
