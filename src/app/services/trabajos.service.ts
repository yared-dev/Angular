import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { trabajosForm } from '../interfaces/trabajos-form.interfaces';
import { Trabajo } from '../models/trabajo.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class TrabajosService {
  public trabajo?: Trabajo;

  constructor(private http: HttpClient, private router: Router) {}
  get token() {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.trabajo?.uid;
  }

  crearTarabjo(formData: trabajosForm) {
    return this.http.post(`${base_url}/trabajos`, formData);
  }
  actualizarTrabajo(data: {
    nombre: string;
    modelo: string;
    telefono: number;
    description: string;
    precio: number;
    urgencia: string;
  }) {
    return this.http.put(`${base_url}/trabajos/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }
}
