export interface Modulos { 
    moduloId: string;
    titulo: string;
    descricao: string;
    imagem?:string
    video?:string
    certificacao: boolean;
    preRequisitos: string;
    publico: string;
    obrigatorio: boolean;
}
