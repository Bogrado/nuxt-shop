import Redis from 'ioredis'

const redis = new Redis({
  host: '95.164.2.168', // IP адрес удаленного сервера, крутится в докере
  port: 6379, // Порт Redis (по умолчанию)
  password: '111241698',
})

export default redis
