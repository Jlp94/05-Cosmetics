export interface ApiCosmeticosResponse {
  cosmeticos: Cosmeticos
}
export interface MessageCosmeticosResponse {
  message: string
  error: string
  statusCode: number
}


export interface Cosmeticos {
  info: Info
  cosmeticos: Cosmetico[]
}

export interface Info {
  total: number
  pages: number
}

export interface Cosmetico { // 1 y Nombre
  _id: string
  name: string
  image: string
  type: string
  brand: string
  price: number
}

export interface ToastInterface {
  message : string;
  classname?: string;
  delay?: number;
}
