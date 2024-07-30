const protectedRoutes = ['/profile', '/favorites']

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, fetchUser } = useAuth()
  await fetchUser()

  if (protectedRoutes.some(route => to.path.startsWith(route)) && !user.value) {
    return navigateTo('/auth_user/login')
  }
})
