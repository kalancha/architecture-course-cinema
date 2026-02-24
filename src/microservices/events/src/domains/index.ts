import type { EachMessagePayload } from 'kafkajs'
import { TOPICS } from '../config/topics.js'
import { handleUserEvents } from './user/index.js'
import { handleMovieEvents } from './movie/index.js'
import { handlePaymentEvents } from './payment/index.js'

export const topicHandlers: Record<string, (payload: EachMessagePayload) => Promise<void>> = {
  [TOPICS.USER_EVENTS]: handleUserEvents,
  [TOPICS.MOVIE_EVENTS]: handleMovieEvents,
  [TOPICS.PAYMENT_EVENTS]: handlePaymentEvents,
}
