import { Usuario } from "./usuario";

export interface Acesso {
    token: string;
    usuario: Usuario;
}
