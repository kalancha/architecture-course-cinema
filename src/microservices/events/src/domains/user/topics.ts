export const USER_EVENT_TYPES = {
  REGISTERED: 'user.registered',
} as const

export type UserEventType = (typeof USER_EVENT_TYPES)[keyof typeof USER_EVENT_TYPES]
