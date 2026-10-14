import z from "zod"

export interface Feedback {
  idFeedback: number
  nombre: string
  descripcion: string
  idCategoria: number
  nombreCategoria: string
  idEstado: number
  nombreEstado: string
  idUsuario: number
  totalVotos: number
  totalComentarios: number
}
export interface FeedbackCreate{
  nombre: string;
  descripcion: string;
  idCategoria: number;
  idEstado: number;
}

export interface FeedbackResponse {
  codigo: number
  message: string
  response: Feedback[]
}

export interface FeedbackSingleResponse {
  codigo: number
  message: string
  response: Feedback
}
export const feedbackSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  idCategoria: z.number().min(1, 'La categoría es requerida'),
  idEstado: z.number().min(1, 'El estado es requerido'),
})
export type FeedbackForm = z.infer<typeof feedbackSchema>


