import { kafka } from './client.js'
import { TOPICS } from '../../config/topics.js'
import { topicHandlers } from '../../domains/index.js'

const consumer = kafka.consumer({ groupId: 'events-service-group' })

export async function startConsumer(): Promise<void> {
  await consumer.connect()

  const topics = Object.values(TOPICS)
  await consumer.subscribe({ topics, fromBeginning: true })

  await consumer.run({
    eachMessage: async (payload) => {
      const { topic } = payload
      const handler = topicHandlers[topic]

      if (handler) {
        await handler(payload)
      } else {
        console.warn('[consumer] Unknown topic:', topic)
      }
    },
  })

  console.log('✅ Kafka consumer started')
}

export async function disconnectConsumer(): Promise<void> {
  await consumer.disconnect()
  console.log('Kafka consumer disconnected')
}
