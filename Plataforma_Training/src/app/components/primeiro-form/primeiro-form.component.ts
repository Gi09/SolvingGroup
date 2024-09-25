import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-primeiro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './primeiro-form.component.html',
  styleUrl: './primeiro-form.component.css'
})
export class PrimeiroFormComponent implements OnInit{
  treinamentoForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.treinamentoForm = this.fb.group({
      nome: ['', Validators.required],
      preRequisitos: [''],
      cargaHoraria: ['', Validators.required],
      emissaoCertificado: [false],
      publicoAlvo: [''],
      obrigatoriedade: [false],
      quantidadeModulos: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.treinamentoForm.valid) {
      this.formDataService.updateFormData(this.treinamentoForm.value); // Compartilha os dados
      this.router.navigate(['/segundo-form']); // Navega para a segunda página
    }
  }
}
