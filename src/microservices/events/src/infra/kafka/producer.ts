import { type Producer } from 'kafkajs'
import { kafka } from './client.js'

let producer: Producer

export async function connectProducer(): Promise<void> {
  producer = kafka.producer()
  await producer.connect()
  console.log('Kafka producer connected')
}

export async function disconnectProducer(): Promise<void> {
  await producer.disconnect()
  console.log('Kafka producer disconnected')
}

export async function sendEvent(topic: string, key: string, value: object) {
  const result = await producer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(value),
      },
    ],
  })

  const record = result[0]
  return {
    partition: record.partition,
    offset: Number(record.baseOffset),
  }
}
