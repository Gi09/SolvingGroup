import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogService } from '../../services/log.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-conclusao',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './conclusao.component.html',
  styleUrls: ['./conclusao.component.css'], // Corrigido para styleUrls
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConclusaoComponent {
  constructor(private logService: LogService) {}

  // Função para capturar cliques
  registrarClicks(botaoId: string, acao: () => void) {
    const logData = {
      id_usuario: 2, // Substitua com o ID do usuário autenticado
      id_curso: 1,   // ID do curso que está sendo acessado
      id_modulo: 1,  // ID do módulo
      acao: 'Clique no botão',
      mensagem: `Usuário clicou no botão ${botaoId}`
    };

    // Enviar o evento de clique para a API de logs
    this.logService.registrarClique(logData)
      .subscribe({
        next: (response) => console.log('Clique registrado com sucesso:', response),
        error: (err) => console.error('Erro ao registrar clique:', err)
      });

    // Executa a ação original (ex: voltar página, próximo módulo, etc.)
    acao();
  }
}
