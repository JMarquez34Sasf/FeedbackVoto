import { z } from 'zod'

export const loginSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  contraseña: z.string().min(8, 'La contraseña debe tener minimo 8 caracteres'),
})
export type LoginForm = z.infer<typeof loginSchema>

export interface AuthResponse {
  codigo: number
  message: string
  response: string
}
