export default defineEventHandler(async event => {
  const config = useRuntimeConfig()

  try {
    deleteCookie(event, config.public.cookieName, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
    return null
  } catch (err) {
    const e = err as {
      data?: { statusCode: number; message?: string; error?: string }
      statusCode?: number
      message?: string
    }
    createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message || 'Internal Server Error',
    })
    return null
  }
})
