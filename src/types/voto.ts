export interface Voto {
  idVoto: number
  idFeedback: number
  idUsuario: number
}

export interface VotoResponse {
  codigo: number
  message: string
  response: Voto
}