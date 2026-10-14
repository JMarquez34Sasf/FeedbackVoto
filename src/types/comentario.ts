import z from "zod";

export interface Comentario {
  idComentario: number
  idFeedback: number
  idUsuario: number
  nombreUsuario: string
  comentario1: string
  fecha: string | null
}

export interface ComentariosResponse {
  codigo: number
  message: string
  response: Comentario[]
}

export interface ComentarioSingleResponse {
  codigo: number
  message: string
  response: Comentario
}

export const commentSchema = z.object({
  comentario1: z.string().min(1, 'El comentario no puede estar vacío'),
})
export type CommentForm = z.infer<typeof commentSchema>
