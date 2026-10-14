import axiosInstance from './axiosInstance'
import type { AuthResponse, LoginForm } from '../types/auth'

export const login = async (data: LoginForm): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/Auth/Login', {
    Nombre: data.nombre,
    Contraseña: data.contraseña,
  })
  return response.data
}

export const register = async (data: LoginForm): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/Auth/Register', {
    Nombre: data.nombre,
    Contraseña: data.contraseña,
  })
  return response.data
}
