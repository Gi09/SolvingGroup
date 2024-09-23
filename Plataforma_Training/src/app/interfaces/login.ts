import { Usuario } from "./usuario";

export interface Login {
    Acesso: {
        token: string;
        usuarios: Usuario[];
    };
}
