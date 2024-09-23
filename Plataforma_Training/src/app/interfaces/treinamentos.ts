import { Modulos } from "./modulos";

export interface Treinamentos {
    id: string
    titulo: string
    descricao: string
    imagem:string
    video:string
    modulos:Modulos[]
}
