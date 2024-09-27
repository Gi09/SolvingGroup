import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-segundo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './segundo-form.component.html',
  styleUrls: ['./segundo-form.component.css']
})
export class SegundoFormComponent implements OnInit {
  modulosForm!: FormGroup;
  quantidadeModulos!: number;
  isExpanded: boolean[] = []; // Array para controlar a expansão dos módulos

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obter os dados da primeira página
    this.formDataService.currentFormData.subscribe(data => {
      if (data) {
        this.quantidadeModulos = data.quantidadeModulos;
        this.initForm();
      } else {
        this.router.navigate(['/primeiro-form']); // Volta para a primeira página se não houver dados
      }
    });
  }

  initForm() {
    this.modulosForm = this.fb.group({
      modulos: this.fb.array([]) // Criar um FormArray para os módulos
    });

    for (let i = 0; i < this.quantidadeModulos; i++) {
      this.addModulo();
      // Deixa o primeiro dropdown aberto
      this.isExpanded.push(i === 0); // O primeiro módulo é inicialmente expandido
    }
  }

  get modulos(): FormArray {
    return this.modulosForm?.get('modulos') as FormArray;
  }

  addModulo() {
    this.modulos.push(this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      video: [''],
      imagens: ['']
    }));
  }

  toggleModule(index: number) {
    this.isExpanded[index] = !this.isExpanded[index]; // Alterna o estado de expansão
  }

  onSubmit() {
    if (this.modulosForm.valid) {
      console.log('Módulos cadastrados:', this.modulosForm.value);
      // Você pode salvar os dados ou enviar para um servidor aqui
    }
  }

  
}
