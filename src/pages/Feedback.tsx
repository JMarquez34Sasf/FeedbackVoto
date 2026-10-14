import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { feedbackSchema, type FeedbackForm } from '../types/feedback'
import type { Estado } from '../types/estado'
import type { Category } from '../types/category'
import { getEstados } from '../services/estadoService'
import { getCategorias } from '../services/categoryService'
import { createFeedback } from '../services/feedbackService'

export default function Feedback() {
  const [estados, setEstados] = useState<Estado[]>([])
  const [categorias, setCategorias] = useState<Category[]>([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getEstados().then((res) => setEstados(res.response))
    getCategorias().then((res) => setCategorias(res.response))
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
  })

  const onSubmit = async (data: FeedbackForm) => {
    try {
      setError('')
      await createFeedback(data)
      navigate('/')
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Error al crear feedback')
    }
  }

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Crear Feedback</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" {...register('nombre')} />
              {errors.nombre?.message && (
                <span className="text-danger small">{errors.nombre.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input type="text" className="form-control" {...register('descripcion')} />
              {errors.descripcion?.message && (
                <span className="text-danger small">{errors.descripcion.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Categoria</label>
              <select className="form-select" {...register('idCategoria', { valueAsNumber: true })}>
                <option value={0}>Selecciona una categoría</option>
                {categorias.map((c) => (
                  <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
                ))}
              </select>
              {errors.idCategoria?.message && (
                <span className="text-danger small">{errors.idCategoria.message}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select className="form-select" {...register('idEstado', { valueAsNumber: true })}>
                <option value={0}>Selecciona un estado</option>
                {estados.map((e) => (
                  <option key={e.idEstado} value={e.idEstado}>{e.nombre}</option>
                ))}
              </select>
              {errors.idEstado?.message && (
                <span className="text-danger small">{errors.idEstado.message}</span>
              )}
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <button type="submit" className="btn btn-primary me-2">
              Crear Feedback
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
