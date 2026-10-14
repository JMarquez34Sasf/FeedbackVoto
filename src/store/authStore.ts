import { create } from 'zustand'

const getRoleFromToken = (token: string): string => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? ''
  } catch {
    return ''
  }
}

interface AuthState {
  token: string | null
  role: string
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('token') ? getRoleFromToken(localStorage.getItem('token')!) : '',
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token, role: getRoleFromToken(token) })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, role: '' })
  },
}))
