import { sendEvent } from '../infra/kafka/producer.js'
import { TOPICS } from '../config/topics.js'
import type { UserEvent } from '../domains/user/types.js'
import type { MovieEvent } from '../domains/movie/types.js'
import type { PaymentEvent } from '../domains/payment/types.js'

export function publishUserEvent(key: string, event: UserEvent) {
  return sendEvent(TOPICS.USER_EVENTS, key, event)
}

export function publishMovieEvent(key: string, event: MovieEvent) {
  return sendEvent(TOPICS.MOVIE_EVENTS, key, event)
}

export function publishPaymentEvent(key: string, event: PaymentEvent) {
  return sendEvent(TOPICS.PAYMENT_EVENTS, key, event)
}
