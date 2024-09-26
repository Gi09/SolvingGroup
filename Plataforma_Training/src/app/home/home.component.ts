import { Component} from '@angular/core';
import { Treinamentos } from '../interfaces/treinamentos';
import { TreinamentosService } from '../services/treinamentos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Usuario } from '../interfaces/usuario';
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
