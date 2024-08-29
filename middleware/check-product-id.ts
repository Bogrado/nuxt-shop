export default defineNuxtRouteMiddleware((to, _from) => {
  const fullSlug = to.params.slug || ''
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const slugParts = fullSlug.split('-')
  const id = parseInt(slugParts.pop())

  if (isNaN(id)) {
    // Перенаправление на страницу с ошибкой или на главную страницу
    return navigateTo('/catalog')
  }
})
