import { MOVIE_EVENT_TYPES } from './topics.js'

// API Request Type matching api-specification.yaml
export interface MovieEventRequest {
  movie_id: number
  title: string
  action: string
  user_id?: number
  rating?: number
  genres?: string[]
  description?: string
}

export interface MoviePayload {
  movieId: number
  title: string
  action: string
  userId?: number
  rating?: number
  genres?: string[]
  description?: string
}

export interface MovieEvent {
  type: typeof MOVIE_EVENT_TYPES.VIEWED
  data: MoviePayload
}
