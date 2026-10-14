import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
  const navigate = useNavigate()
  const { token, logout } = useAuthStore()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
      <Link className="navbar-brand fw-bold" to="/">
        FeedbackBoard
      </Link>

      <div className="ms-auto d-flex gap-2">
        {token ? (
          <>
            <Link className="btn btn-success btn-sm" to="/feedback">
              Crear Feedback
            </Link>
            <button className="btn btn-outline-light btn-sm" onClick={() => { logout(); navigate('/login') }}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-success btn-sm" to="/login">
              Iniciar sesión
            </Link>
            <Link className="btn btn-success btn-sm" to="/register">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
