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
  slug: string

  [key: string]: unknown // Подпись для неизвестных свойств
}

export interface FullItem {
  id: number
  title: string
  price: number
  category: string
  image: string
  rate: number
  count: number
  slug: string
  description: string

  [key: string]: unknown // Подпись для неизвестных свойств
}

export interface ApiResponse {
  data: {
    id: number
  }
}

export interface User {
  id: number
  role: string
  nickName: string
  email: string
}

export interface Credentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UserData {
  password: string
  nickName: string
  email: string
}
