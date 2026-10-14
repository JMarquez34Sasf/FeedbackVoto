import axiosInstance from './axiosInstance'
import type { EstadoResponse } from '../types/estado'

export const getEstados = async (): Promise<EstadoResponse> => {
  const response = await axiosInstance.get<EstadoResponse>('/Estado')
  return response.data
}