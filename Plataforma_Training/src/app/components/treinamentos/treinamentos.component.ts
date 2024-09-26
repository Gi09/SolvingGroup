import { Component, OnInit } from '@angular/core';
import { Treinamentos } from '../../interfaces/treinamentos';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TreinamentosService } from '../../services/treinamentos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-treinamentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './treinamentos.component.html',
  styleUrl: './treinamentos.component.css'
})
export class TreinamentosComponent implements OnInit {
  treinamentoSelecionado?: Treinamentos;
  treinamentoForm: FormGroup = new FormGroup({});
  id?: string;
  moduloSelecionado: any = null;
  moduloForm: FormGroup = new FormGroup({})
  moduloAtual = 0;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private treinamentoService: TreinamentosService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getTreinamentoById();
  }

  getTreinamentoById(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.treinamentoService.getById(this.id).subscribe(treinamentoResponse => {
      // debugger;
      this.treinamentoSelecionado = treinamentoResponse;

      // Seleciona o primeiro módulo como padrão
      this.moduloSelecionado = this.treinamentoSelecionado.modulos[this.moduloAtual];
      
      this.treinamentoForm = this.formBuilder.group({
        titulo: [this.treinamentoSelecionado.titulo],
        descricao: [this.treinamentoSelecionado.descricao],
        imagem: [this.treinamentoSelecionado.imagem],
        video: [this.treinamentoSelecionado.video],
        modulos: [this.treinamentoSelecionado.modulos],
        id: [this.treinamentoSelecionado.id]
      });

      this.atualizarModuloForm();
    });
  }

  atualizarModuloForm(): void {
    if (this.moduloSelecionado) {
      this.moduloForm = this.formBuilder.group({
        titulo: [this.moduloSelecionado.titulo],
        descricao: [this.moduloSelecionado.descricao],
        imagem: [this.moduloSelecionado.imagem],
        video: [this.moduloSelecionado.video],
        certificacao: [this.moduloSelecionado.certificacao || false],
        preRequisitos: [this.moduloSelecionado.preRequisitos || ''],
        publico: [this.moduloSelecionado.publico || ''],
        obrigatorio: [this.moduloSelecionado.obrigatorio || false],
      });
    }
  }

  selecionarModulo(modulo: any): void {
    this.moduloSelecionado = modulo;
    this.atualizarModuloForm();
  }

  voltarPagina() {
    this.location.back();
  }

  // Captura dos logs
  registrarClicks(botaoId: string, acao: Function){
    // Chamar a api
  }
}
