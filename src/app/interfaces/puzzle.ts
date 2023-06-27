export interface Puzzle {
  marca: string,
  titulo: string,
  categoria: string,
  precio: number,
  piezas: number,
  propietario: string,
  filepath: string,
  webviewPath?: string,
  alto?: number,
  ancho?: number,
  año?: number,
  condicion?: string,
  estado?: string,
  privado?: boolean,
  comentario?: string,
  userid?: string,
  localizacion?: string
}

