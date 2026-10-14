import axiosInstance from './axiosInstance'
import type { ComentariosResponse, ComentarioSingleResponse, CommentForm } from '../types/comentario'

export const getComentarios = async (idFeedback: number): Promise<ComentariosResponse> => {
  const response = await axiosInstance.get<ComentariosResponse>(`/Comentario/${idFeedback}`)
  return response.data
}

export const postComentario = async (data: CommentForm & { idFeedback: number }): Promise<ComentarioSingleResponse> => {
  const response = await axiosInstance.post<ComentarioSingleResponse>('/Comentario', {
    comentario1: data.comentario1,
    idFeedback: data.idFeedback,
  })
  return response.data
}