export interface Estado {
  idEstado: number
  nombre: string
  descripcion: string
}

export interface EstadoResponse {
  codigo: number
  message: string
  response: Estado[]
}