import axiosInstance from './axiosInstance'
import type { CategoryResponse } from '../types/category'

export const getCategorias = async (): Promise<CategoryResponse> => {
  const response = await axiosInstance.get<CategoryResponse>('/Categoria')
  return response.data
}