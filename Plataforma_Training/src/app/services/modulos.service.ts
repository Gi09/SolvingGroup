import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modulos } from '../interfaces/modulos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {
/*
  private modulosUrl = "http://localhost:3000/treinamentos"
  constructor(private http:HttpClient) {

  }

  httpHeader = {
    headers:{
      "Content-Type":"Application/json"
    }
  }

  modulo:Modulos[] = [];

  listaroMo():Observable<Modulos[]>{
    return this.http.get<Modulos[]>(this.modulosUrl) as Observable<Modulos[]>
  }

  getById(id:string):Observable<Modulos>{
    return this.http.get(`${this.modulosUrl}/${id}`) as Observable<Modulos>
  }*/
}
