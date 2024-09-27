import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../interfaces/usuario';
import { TreinamentosService } from '../../services/treinamentos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Treinamentos } from '../../interfaces/treinamentos';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  treinamentos:Treinamentos[] = [];
  treinamentoForm: FormGroup = new FormGroup({})
  usuario: Usuario | null = null;
  isAdmin: boolean = false;

    
    constructor(private treinamentoService:TreinamentosService, private formbuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.treinamentoForm = this.formbuilder.group({
  })

 }

   ngOnInit():void{
   // Recupera o usuário da sessão
   this.usuario = this.loginService.getCurrentUser();
   this.isAdmin = this.usuario?.role === 'admin';
 }

}
