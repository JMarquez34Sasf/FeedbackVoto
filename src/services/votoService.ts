import axiosInstance from './axiosInstance'
import type { VotoResponse } from '../types/voto'

export const postVoto = async (idFeedback: number): Promise<VotoResponse> => {
  const response = await axiosInstance.post<VotoResponse>('/Voto', { idFeedback })
  return response.data
}
