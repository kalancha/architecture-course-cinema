export const TOPICS = {
  USER_EVENTS: 'user-events',
  MOVIE_EVENTS: 'movie-events',
  PAYMENT_EVENTS: 'payment-events',
} as const

export type TopicName = (typeof TOPICS)[keyof typeof TOPICS]
