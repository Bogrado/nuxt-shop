export const handleFetchError = (err: unknown) => {
  const e = err as {
    data?: { statusCode: number; message?: string; error?: string }
    statusCode?: number
    message?: string
  }

  if (e.data && e.data.statusCode) {
    throw createError({
      statusCode: e.data.statusCode,
      statusMessage: e.data.message || 'Error from external API',
      data: { error: e.data.error },
    })
  }
  throw createError({
    statusCode: e.statusCode || 500,
    statusMessage: e.message || 'Internal Server Error',
  })
}
