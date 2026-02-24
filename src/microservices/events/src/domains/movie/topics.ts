export const MOVIE_EVENT_TYPES = {
  VIEWED: 'movie.viewed',
} as const

export type MovieEventType = (typeof MOVIE_EVENT_TYPES)[keyof typeof MOVIE_EVENT_TYPES]
