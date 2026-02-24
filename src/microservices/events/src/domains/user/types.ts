import { USER_EVENT_TYPES } from './topics.js'

export interface UserEventRequest {
  user_id: number
  action: string
  timestamp: string
  username?: string
  email?: string
}

export interface UserPayload {
  userId: number
  action: string
  timestamp: string
  username?: string
  email?: string
}

export interface UserEvent {
  type: typeof USER_EVENT_TYPES.REGISTERED
  data: UserPayload
}
