import { PAYMENT_EVENT_TYPES } from './topics.js'

export interface PaymentEventRequest {
  payment_id: number
  user_id: number
  amount: number
  status: string
  timestamp: string
  method_type?: string
}

export interface PaymentCreatedPayload {
  paymentId: number
  userId: number
  amount: number
  status: string
  timestamp: string
  methodType?: string
}


export interface PaymentCreatedEvent {
  type: typeof PAYMENT_EVENT_TYPES.CREATED
  data: PaymentCreatedPayload
}

export type PaymentEvent = PaymentCreatedEvent
