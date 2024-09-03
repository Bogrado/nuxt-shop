import type { Item } from '~/types'

/**
 * Утилита для денормализации данных корзины
 *
 * @param fetchedProducts - массив уникальных товаров, полученный с сервера
 * @param itemIds - массив id товаров в корзине, который содержит дубли id товаров в зависимости от их количества
 * @returns массив товаров, где каждый товар дублируется в зависимости от его количества в корзине
 */
export function denormalizeItems(
  fetchedProducts: Item[],
  itemIds: number[]
): Item[] {
  return fetchedProducts.flatMap(product => {
    const itemCount = itemIds.filter(id => id === product.id).length
    return Array(itemCount).fill(product)
  })
}
