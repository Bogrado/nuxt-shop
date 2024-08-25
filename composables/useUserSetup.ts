export const useUserSetup = () => {
  const createCartForUser = async (userId: number) => {
    try {
      await $fetch('/api/cart/create', {
        method: 'POST',
        body: { user_id: userId, items: [] },
      })
    } catch (err) {
      console.error('Error creating cart for user:', err)
    }
  }

  const createFavoritesForUser = async (userId: number) => {
    try {
      await $fetch('/api/favorites/create', {
        method: 'POST',
        body: { user_id: userId, items: [] },
      })
    } catch (err) {
      console.error('Error creating favorites for user:', err)
    }
  }

  return {
    createCartForUser,
    createFavoritesForUser,
  }
}
