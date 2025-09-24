import axios from "axios";
import { ICart, IProduct } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const getCatalog = async (search: string = '') => {
  const response = await api.get<IProduct[]>('/catalog', {
    params: { search }
  })

  return response.data
}

export const getCart = async () => {
  const response = await api.get<ICart>('/cart')

  return response.data
}

export const addToCart = async (productId: number, quantity: number) => {
  const response = await api.post<{ id: number }>('/cart', {
    productId,
    quantity
  })

  return response.data
}

export const updateCartItemQuantity = async (cartId: number, productId: number, quantity: number) => {
  const response = await api.put<ICart>(`/cart/${cartId}/items/${productId}`, {
    quantity
  })

  return response.data
}

export const removeCartItem = async (cartId: number, productId: number) => {
  const response = await api.delete(`/cart/${cartId}/items/${productId}`)
}
