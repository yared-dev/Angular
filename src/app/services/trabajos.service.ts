import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { trabajosForm } from '../interfaces/trabajos-form.interfaces';
import { Trabajo, TrabajoUserInterface } from '../models/trabajo.model';

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
    return this.trabajo?._id;
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  cargarTrabajo(desde: number = 0, estado: boolean = false) {
    console.log(desde);
    console.log(estado);
    const url = `${base_url}/trabajos?desde=${desde}&estado=${estado}`;
    return this.http.get<TrabajoUserInterface>(url, this.headers).pipe(
      delay(50),
      map((resp) => {
        const trabajos = resp.trabajo.map((trabajo: any) => {
          return new Trabajo(
            trabajo.nombre,
            trabajo.modelo,
            trabajo.telefono,
            trabajo.description,
            trabajo.precio,
            trabajo.urgencia,
            trabajo.date,
            trabajo._id,
            trabajo.usuario
          );
        });
        return { total: resp.total, trabajos };
      })
    );
  }
  crearTarabjo(data: {
    nombre: string;
    modelo: string;
    telefono: number;
    precio: number;
    description: string;
    urgencia: string;
    estado: false;
  }) {
    return this.http.post(`${base_url}/trabajos`, data, this.headers);
  }
  actualizarTrabajo(trabajo: Trabajo) {
    return this.http.put(`${base_url}/trabajos/${this.uid}`, trabajo, {
      headers: {
        'x-token': this.token,
      },
    });
  }
  borrarTrabajo(trabajo: Trabajo) {
    const url = `${base_url}/trabajos/${trabajo._id}`;
    return this.http.delete(url, this.headers);
  }
  dataGrafico(): any {
    const url = `${base_url}/graficos`;
    return this.http.get(url);
  }
}
