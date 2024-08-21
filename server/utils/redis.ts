import Redis from 'ioredis'

const redis = new Redis({
  host: '127.0.0.1', // Локальный адрес для Redis
  port: 6379, // Порт Redis (по умолчанию)
})

export default redis
