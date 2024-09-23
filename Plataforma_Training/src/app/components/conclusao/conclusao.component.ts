import { Component } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-conclusao',
  standalone: true,
  imports: [],
  templateUrl: './conclusao.component.html',
  styleUrl: './conclusao.component.css'
})
export class ConclusaoComponent {
  constructor(private logService: LogService) { }

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
