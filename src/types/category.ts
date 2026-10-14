export interface Category {
  idCategoria: number
  nombre: string
}

export interface CategoryResponse {
  codigo: number
  message: string
  response: Category[]
}
