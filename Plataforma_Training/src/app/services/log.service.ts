import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private apiUrl = 'http://localhost:3000/api/log';  // URL da sua API Node.js

  constructor(private http: HttpClient) { }

  // Função para registrar o clique
  registrarClique(logData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, logData, { headers });
  }
}
