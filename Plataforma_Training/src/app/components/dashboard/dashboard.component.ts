import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Treinamentos } from '../../interfaces/treinamentos';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { TreinamentosService } from '../../services/treinamentos.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  
  treinamentos:Treinamentos[] = [];
  treinamentoForm: FormGroup = new FormGroup({})
  usuario: Usuario | null = null;
  isAdmin: boolean = false;

  constructor(private treinamentoService:TreinamentosService, private formbuilder: FormBuilder, private loginService: LoginService, private router: Router) {
  this.treinamentoForm = this.formbuilder.group({
  })

 }

 listar():void{
    this.treinamentoService.listarTre().subscribe((listarTreinamento) => (this.treinamentos = listarTreinamento))
 }

 ngOnInit():void{
   this.listar();
   // Recupera o usuário da sessão
   this.usuario = this.loginService.getCurrentUser();
   this.isAdmin = this.usuario?.role === 'admin';
 }

}
