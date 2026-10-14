import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { loginSchema, type LoginForm } from '../types/auth'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const { handleRegister, error } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" >
        <h4 className="card-title mb-4 text-center">Crear cuenta</h4>

        <form onSubmit={handleSubmit(handleRegister)} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" {...register('nombre')} />
            {errors.nombre?.message && (
              <span className="text-danger small">{errors.nombre.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" {...register('contraseña')} />
            {errors.contraseña?.message && (
              <span className="text-danger small">{errors.contraseña.message}</span>
            )}
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Registrarse
          </button>

          <p className="text-center mb-0 text-muted small">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
