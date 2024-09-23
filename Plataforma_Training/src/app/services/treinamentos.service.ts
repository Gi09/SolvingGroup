import { Treinamentos } from '../interfaces/treinamentos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modulos } from '../interfaces/modulos';
import { map } from 'rxjs/operators';
import { ModulosComponent } from '../components/modulos/modulos.component';

@Injectable({
  providedIn: 'root'
})
export class TreinamentosService {

  private treinamentoUrl = "http://localhost:3000/treinamentos";

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: {
      "Content-Type": "Application/json"
    }
  };

  listarTre(): Observable<Treinamentos[]> {
    return this.http.get<Treinamentos[]>(this.treinamentoUrl) as Observable<Treinamentos[]>;
  }

  getById(id: string): Observable<Treinamentos> {
    return this.http.get(`${this.treinamentoUrl}/${id}`) as Observable<Treinamentos>;
  }

  getModuloById(id: string, moduloId: string): Observable<Modulos> {
    return this.http.get<Modulos>(`${this.treinamentoUrl}/${id}/modulos/${moduloId}`);
  }
}

