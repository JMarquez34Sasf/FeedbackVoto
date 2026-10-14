import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { login, register } from '../services/authService'
import type { LoginForm } from '../types/auth'

export function useAuth() {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { setToken, logout } = useAuthStore()

  const handleLogin = async (data: LoginForm) => {
    try {
      setError('')
      setIsSubmitting(true)
      const res = await login(data)
      setToken(res.response)
      navigate('/')
    } catch (e: any) {
      setError(e.response?.data?.response ?? 'Error al iniciar sesión')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (data: LoginForm) => {
    try {
      setError('')
      setIsSubmitting(true)
      await register(data)
      navigate('/login')
    } catch (e: any) {
      setError(e.response?.data?.response ?? 'Error al registrarse')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleLogin, handleRegister, logout, error, isSubmitting }
}
