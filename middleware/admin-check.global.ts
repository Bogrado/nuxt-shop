const protectedRoutes = ['/admin_panel']

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { user, fetchUser } = useAuth()
  await fetchUser()

  if (
    protectedRoutes.some(route => to.path.startsWith(route)) &&
    user.value?.role !== 'admin'
  ) {
    return navigateTo('/catalog')
  }
})
