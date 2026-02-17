import type { EachMessagePayload } from 'kafkajs'
import { MOVIE_EVENT_TYPES } from './topics.js'
import type { MovieEvent } from './types.js'

async function handleMovieViewed(event: MovieEvent): Promise<void> {
  const { movieId, userId, rating, title } = event.data

  console.log(`[movie.viewed] Movie "${title}" (${movieId}) viewed by user ${userId || 'anonymous'}${rating ? `, rating: ${rating}` : ''}`)
}

export async function handleMovieEvents(payload: EachMessagePayload): Promise<void> {
  const rawValue = payload.message.value?.toString()
  if (!rawValue) return

  try {
    const event = JSON.parse(rawValue) as MovieEvent

    switch (event.type) {
      case MOVIE_EVENT_TYPES.VIEWED:
        await handleMovieViewed(event)
        break
      default:
        console.warn(`[movie] Unhandled event type: ${(event as any).type}`)
    }
  } catch (error) {
    console.error('[movie] Failed to parse event', error)
  }
}
