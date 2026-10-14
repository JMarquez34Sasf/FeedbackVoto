import axiosInstance from './axiosInstance'
import type { FeedbackCreate, FeedbackResponse, FeedbackSingleResponse } from '../types/feedback'

export const getFeedbacks = async (idCategoria?: number, orderByVotos?: boolean): Promise<FeedbackResponse> => {
  const params: Record<string, any> = {}
  if (idCategoria) params.idCategoria = idCategoria
  if (orderByVotos) params.orderByVotos = true
  const response = await axiosInstance.get<FeedbackResponse>('/Feedback', { params })
  return response.data
}

export const getFeedback = async (id: number): Promise<FeedbackSingleResponse> => {
  const response = await axiosInstance.get<FeedbackSingleResponse>(`/Feedback/${id}`)
  return response.data
}

export const createFeedback = async (data: FeedbackCreate): Promise<FeedbackResponse> => {
  const response = await axiosInstance.post<FeedbackResponse>('/Feedback', data)
  return response.data
}

export const updateEstado = async (id: number, idEstado: number): Promise<void> => {
  await axiosInstance.patch(`/Feedback/${id}/estado/${idEstado}`)
}