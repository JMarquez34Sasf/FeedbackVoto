import { useEffect, useState } from 'react'
import { getFeedbacks, updateEstado } from '../services/feedbackService'
import { getCategorias } from '../services/categoryService'
import { getEstados } from '../services/estadoService'
import { postVoto } from '../services/votoService'
import type { Feedback } from '../types/feedback'
import type { Category } from '../types/category'
import type { Estado } from '../types/estado'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Home() {
  const { token, role } = useAuthStore()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [categorias, setCategorias] = useState<Category[]>([])
  const [estados, setEstados] = useState<Estado[]>([])
  const [idCategoria, setIdCategoria] = useState<number>(0)
  const [orderByVotos, setOrderByVotos] = useState(false)
  const [votados, setVotados] = useState<number[]>([])
  const [alertMessage, setAlertMessage] = useState('')

  const showAlert = (message: string) => {
    setAlertMessage(message)
  }

  useEffect(() => {
    getCategorias().then((res) => setCategorias(res.response))
    if (role === 'Admin') getEstados().then((res) => setEstados(res.response))

  }, [])

  useEffect(() => {
    getFeedbacks(idCategoria || undefined, orderByVotos).then((res) => setFeedbacks(res.response))
  }, [idCategoria, orderByVotos])

  const handleVotar = async (e: React.MouseEvent, idFeedback: number) => {
    e.preventDefault()
    const yaVoto = votados.includes(idFeedback)

    if (yaVoto) {
      showAlert('Ya has votado por este feedback.')
      return 
    }

    try {
      await postVoto(idFeedback)
      setVotados((prev) => [...prev, idFeedback])
    } catch {
      showAlert('No puedes votar por el mismo feedback dos veces')
    }
  }

  const handleEstado = async (e: React.ChangeEvent<HTMLSelectElement>, idFeedback: number) => {
    e.preventDefault()
    await updateEstado(idFeedback, Number(e.target.value))
    getFeedbacks(idCategoria || undefined, orderByVotos).then((res) => setFeedbacks(res.response))
  }

  return (
    <div className="container py-4">
      {alertMessage && (
        <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            
            aria-label="Close"
            onClick={() => setAlertMessage('')}
          />
        </div>
      )}

      <div className="d-flex gap-2 mb-4">
        <select className="form-select w-auto" value={idCategoria} onChange={(e) => setIdCategoria(Number(e.target.value))}>
          <option value={0}>Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
          ))}
        </select>

        <select className="form-select w-auto" value={String(orderByVotos)} onChange={(e) => setOrderByVotos(e.target.value === 'true')}>
          <option value="false">Mas Recientes</option>
          <option value="true">Mas Votados</option>
        </select>
      </div>

      <div className="row g-3">
        {feedbacks.map((f) => (
          <div className="col-12 col-md-6 col-lg-4" key={f.idFeedback}>
            <Link to={`/feedbackcomentario/${f.idFeedback}`} className="text-decoration-none text-dark">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex gap-2 mb-2">
                    <span className="badge bg-secondary">{f.nombreCategoria}</span>
                    <span className="badge bg-success">{f.nombreEstado}</span>
                  </div>
                  <h5 className="card-title">{f.nombre}</h5>
                  <p className="card-text text-muted small">{f.descripcion}</p>
                  {/*Aqui damos acceso al select solo al rol admin*/}
                  {role === 'Admin' && (
                    <select
                      className="form-select form-select-sm mt-2"
                      value={f.idEstado}
                      onClick={(e) => e.preventDefault()}
                      onChange={(e) => handleEstado(e, f.idFeedback)}
                    >
                      {estados.map((e) => (
                        <option key={e.idEstado} value={e.idEstado}>{e.nombre}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted">{f.totalVotos} votos · {f.totalComentarios} comentarios</small>
                  {token && (
                    <button
                      className={`btn btn-sm ${votados.includes(f.idFeedback) ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={(e) => handleVotar(e, f.idFeedback)}
                    >
                      Votar
                    </button>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
