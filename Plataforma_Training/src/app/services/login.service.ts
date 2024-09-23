import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL para o JSON

  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  // Método para buscar usuário pelo email e senha
  login(email: string, senha: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, {
      params: {
        email: email,
        senha: senha
      }
    });
  }

  setSession(user: Usuario): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser(): Usuario | null {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }
}
