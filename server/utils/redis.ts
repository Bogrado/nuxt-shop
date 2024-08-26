import Redis from 'ioredis'
const config = useRuntimeConfig()

const redis = new Redis({
  host: config.public.redisUrl, // IP адрес удаленного сервера, крутится в докере
  port: config.public.redisPort, // Порт Redis (по умолчанию)
  password: config.public.redisPassword,
})

export default redis
