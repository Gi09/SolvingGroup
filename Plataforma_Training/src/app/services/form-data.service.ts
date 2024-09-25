import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  // Usando BehaviorSubject para compartilhar os dados 
  private formData = new BehaviorSubject<any>(null);
  currentFormData = this.formData.asObservable();

  constructor() { }

  updateFormData(data: any){
    this.formData.next(data);
  }
}
