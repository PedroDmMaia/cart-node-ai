import axios from "axios";
import { IProduct } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const getCatalog = async (search: string = '') => {
  const response = await api.get<IProduct[]>('/catalog', {
    params: { search }
  })

  return response.data
}
