import Redis from 'ioredis'
const config = useRuntimeConfig()

const redis = new Redis({
  host: config.redisUrl, // IP адрес удаленного сервера, крутится в докере
  port: config.redisPort, // Порт Redis (по умолчанию)
  password: config.redisPassword,
})

export default redis
