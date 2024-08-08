export interface StateItems {
  id: number

  [key: string]: unknown // Подпись для неизвестных свойств
}

export interface CartData {
  user_id: number
  items: []
  id: number
}

export interface FavoritesData {
  user_id: number
  items: []
  id: number
}

export interface Item {
  id: number
  title: string
  price: number
  category: string
  image: string
  rate: number
  count: number
  [key: string]: unknown // Подпись для неизвестных свойств
}
