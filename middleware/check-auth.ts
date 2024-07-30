export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { user } = useAuth()

  if (!user.value) {
    return navigateTo('/login')
  }
})
