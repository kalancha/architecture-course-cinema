import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'events-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  retry: {
    maxRetryTime: 10000,
    initialRetryTime: 300,
    retries: 5,
    factor: 0.2,
    multiplier: 2
  }
})
