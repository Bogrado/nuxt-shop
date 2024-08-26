// server/api/data/item.patch.ts
import { handleFetchError } from '~/utils/handleFetchError'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event = {} as H3Event) => {
  const config = useRuntimeConfig()
  const { id, item } = await readBody<{
    id: number
    item: {
      id: number
      title: string
      price: number
      category: string
      description: string
      image: string
    }
  }>(event)

  try {
    console.log(id, item)
    return await $fetch(`${config.public.baseUrl}/items/${id}`, {
      method: 'PATCH',
      body: { ...item },
    })
  } catch (err) {
    handleFetchError(err)
  }
})
