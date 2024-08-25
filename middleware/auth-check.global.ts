const protectedRoutes = ['/profile', '/favorites', '/cart/checkout']

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { user, fetchUser } = useAuth()
  await fetchUser()

  if (protectedRoutes.some(route => to.path.startsWith(route)) && !user.value) {
    return navigateTo('/auth_user/login')
  }
})
