import { Component, OnInit, PipeTransform } from '@angular/core';
import { Treinamentos } from '../../interfaces/treinamentos';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TreinamentosService } from '../../services/treinamentos.service';
import { Location } from '@angular/common';
import { Modulos } from '../../interfaces/modulos';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent implements OnInit {
  treinamentoSelecionado?: Treinamentos;
  moduloSelecionado?: Modulos;
  moduloForm: FormGroup;
  moduloAtual = 0;
  videoUrl?: SafeResourceUrl;
  
  constructor(
    private route: ActivatedRoute,
    private treinamentoService: TreinamentosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.moduloForm = this.formBuilder.group({
      titulo: [''],
      descricao: [''],
      imagem: [''],
      video: [''],
      certificacao: [false],
      preRequisitos: [''],
      publico: [''],
      obrigatorio: [false],
    });
  }
  
  ngOnInit(): void {
    this.getTreinamentoEModuloById();
  }
  
  getTreinamentoEModuloById(): void {
    const treinamentoId = this.route.snapshot.paramMap.get('id') ?? '';
    const moduloId = this.route.snapshot.queryParamMap.get('moduloId');
  
    this.treinamentoService.getById(treinamentoId).subscribe(treinamentoResponse => {
      this.treinamentoSelecionado = treinamentoResponse;
  
      if (moduloId) {
        const index = this.treinamentoSelecionado.modulos.findIndex(modulo => modulo.moduloId === moduloId);
        if (index !== -1) {
          this.selecionarModulo(index);
        }
      } else {
        this.selecionarModulo(0); // Seleciona o primeiro módulo por padrão
      }
  
      if (this.moduloSelecionado) {
        this.moduloForm.patchValue({
          titulo: this.moduloSelecionado.titulo,
          descricao: this.moduloSelecionado.descricao,
          imagem: this.moduloSelecionado.imagem,
          video: this.moduloSelecionado.video,
          certificacao: this.moduloSelecionado.certificacao,
          preRequisitos: this.moduloSelecionado.preRequisitos,
          publico: this.moduloSelecionado.publico,
          obrigatorio: this.moduloSelecionado.obrigatorio,
        });
  
        // Verifica se há uma URL de vídeo e sanitiza a URL do vídeo
        if (this.moduloSelecionado.video) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getYouTubeEmbedUrl(this.moduloSelecionado.video));
        } else {
          this.videoUrl = undefined; // Limpa a URL do vídeo se não houver
        }
      }
  
    }, error => {
      console.error('Erro ao buscar o módulo:', error);
    });
  }
  
  selecionarModulo(index: number): void {
    this.moduloAtual = index;
    this.moduloSelecionado = this.treinamentoSelecionado?.modulos[index];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { moduloId: this.moduloSelecionado?.moduloId },
      queryParamsHandling: 'merge',
    });
  
    // Atualiza a URL do vídeo ao selecionar um novo módulo
    if (this.moduloSelecionado && this.moduloSelecionado.video) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getYouTubeEmbedUrl(this.moduloSelecionado.video));
    } else {
      this.videoUrl = undefined;
    }
  }

    // Captura dos logs
  registrarClicks(botaoId: string, acao: Function){
      // Enviar o evento de clique para o backend
      this.http.post('http://localhost:3000/click', { buttonId: botaoId })
      .subscribe({
        next: (response) => console.log('Clique registrado:', response),
        error: (err) => console.error('Erro ao registrar clique:', err)
      });

    // Executa a ação original (ex: voltarPagina, proximoModulo, etc)
    acao();
}

  // Pula para o próximo módulo
  proximoModulo(): void {
    // Verifica se o treinamento está definido e se o módulo atual não é o último
    if (this.treinamentoSelecionado) {
      if (this.moduloAtual < this.treinamentoSelecionado.modulos.length - 1) {
        // Avança para o próximo módulo
        this.selecionarModulo(this.moduloAtual + 1);
      } else {
        // Já estamos no último módulo, impedir a navegação
        console.log('Você já está no último módulo.');
      }
    }
  }
  
  // Volta ao modulo anterior 
  voltarModulo(): void {
    // Verifica se o treinamento está definido e se o módulo atual não é o primeiro
    if (this.treinamentoSelecionado && this.moduloAtual > 0) {
      // Volta para o módulo anterior
      this.selecionarModulo(this.moduloAtual - 1);
    } else {
      // Já estamos no primeiro módulo, impedir a navegação
      console.log('Você já está no primeiro módulo.');
    }
  }

  // Verifica se o usuário está no último módulo
  isUltimoModulo(): boolean {
    // Verifica se o treinamento foi carregado e se há módulos
    if (this.treinamentoSelecionado && this.treinamentoSelecionado.modulos) {
      // Retorna true se o módulo atual for o último
      return this.moduloAtual === this.treinamentoSelecionado.modulos.length - 1;
    }
    return false;
  }
  
  // Conclusão do curso
  concluirCurso(): void {
    this.registrarClicks('concluirCurso', () => {
      // Redireciona o usuário para a página de conclusão do curso
      this.router.navigate(['/conclusao-curso']);
      console.log('Curso Concluído');
    });
  }
  
  // Volta para o início
  voltarPagina(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  
  private getYouTubeEmbedUrl(videoUrl: string): string {
    // Extrair o ID do vídeo da URL
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

}
