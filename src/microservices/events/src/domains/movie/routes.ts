import { Hono } from 'hono'
import { publishMovieEvent } from '../../services/eventPublisher.js'
import { MOVIE_EVENT_TYPES } from './topics.js'
import type { MovieEvent, MovieEventRequest } from './types.js'

const app = new Hono()

app.post('/', async (c) => {
  try {
    const body = await c.req.json<MovieEventRequest>()
    const { movie_id, title, action, user_id, rating, genres, description } = body

    const event: MovieEvent = {
      type: MOVIE_EVENT_TYPES.VIEWED,
      data: {
        movieId: movie_id,
        title,
        action,
        userId: user_id,
        rating,
        genres,
        description,
      },
    }

    await publishMovieEvent(String(movie_id), event)

    return c.json({
      status: 'success',
      event,
    }, 201)
  } catch (error) {
    console.error('Failed to process movie event:', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

export const movieRoutes = app
