import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Feedback } from '../types/feedback'
import { commentSchema, type CommentForm, type Comentario } from '../types/comentario'
import { getFeedback } from '../services/feedbackService'
import { getComentarios, postComentario } from '../services/comentarioService'

export default function FeedbackComentario() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [error, setError] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
  })

  useEffect(() => {
    if (!id) return
    getFeedback(Number(id)).then((res) => setFeedback(res.response))
    getComentarios(Number(id)).then((res) => setComentarios(res.response))
  }, [id])

  const onSubmit = async (data: CommentForm) => {
    try {
      setError('')
      await postComentario({ ...data, idFeedback: Number(id) })
      const res = await getComentarios(Number(id))
      setComentarios(res.response)
      reset()
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Error al publicar comentario')
    }
  }

  return (
    <div className="container py-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
        Volver
      </button>

      {feedback && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex gap-2 mb-2">
              <span className="badge bg-secondary">{feedback.nombreCategoria}</span>
              <span className="badge bg-success">{feedback.nombreEstado}</span>
            </div>
            <h5 className="card-title">{feedback.nombre}</h5>
            <p className="card-text text-muted">{feedback.descripcion}</p>
            <small className="text-muted">{feedback.totalVotos} votos · {feedback.totalComentarios} comentarios</small>
          </div>
        </div>
      )}

      <h5>Comentarios ({comentarios.length})</h5>

      {comentarios.map((c) => (
        <div key={c.idComentario} className="border-bottom py-2">
          <small className="text-muted">{c.nombreUsuario}</small>
          <p className="mb-0">{c.comentario1}</p>
        </div>
      ))}

      <h6 className="mt-4">Agregar comentario</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <textarea className="form-control" rows={3} {...register('comentario1')} />
          {errors.comentario1?.message && (
            <span className="text-danger small">{errors.comentario1.message}</span>
          )}
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Publicar
        </button>
      </form>
    </div>
  )
}
