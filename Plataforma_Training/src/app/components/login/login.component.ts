import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Login } from '../../interfaces/login';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.loginService.login(this.username, this.password).subscribe({
      next: (usuarios: Usuario[]) => {
        // Verifica se algum usuário foi encontrado e se a senha está correta
        const user = usuarios.find(u => u.email === this.username && u.senha === this.password);
  
        if (user) {
          // Armazena as informações do usuário na sessão ou localStorage
          this.loginService.setSession(user);
  
          // Redireciona para a página de treinamentos
          this.router.navigate(['/treinamentos'], { state: { role: user.role } });
        } else {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        }
      },
      error: () => {
        this.errorMessage = 'Erro ao fazer login. Tente novamente.';
      }
    });
  }
}
