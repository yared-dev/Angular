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
    return this.trabajo?.id;
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  cargarTrabajo(desde: number = 0, estado: boolean = false) {
    const url = `${base_url}/trabajos/${estado}`;
    return this.http.get<TrabajoUserInterface>(url, this.headers).pipe(
      delay(50),
      map((resp) => {
        const trabajos = resp.trabajo.map((trabajo: any) => {
          console.table(trabajo);
          return new Trabajo(
            trabajo.estate,
            trabajo.idjobs,
            trabajo.name,
            trabajo.model,
            trabajo.phone_number,
            trabajo.price,
            trabajo.description,
            trabajo.priority,
            trabajo.empleado,
            trabajo.id_user,
            trabajo.producto,
            trabajo.date
          );
        });
        return { total: resp.total, trabajos };
      })
    );
  }
  crearTarabjo(data: {
    name: string;
    model: string;
    phone_number: number;
    price: number;
    description: string;
    priority: string;
    estate: false;
    iduser?: string;
    idproduct: any;
  }) {
    return this.http.post(`${base_url}/trabajos`, data, this.headers);
  }
  actualizarTrabajo(trabajo: Trabajo) {
    return this.http.put(
      `${base_url}/trabajos/${trabajo.id}`,
      trabajo,
      this.headers
    );
  }
  borrarTrabajo(trabajo: Trabajo) {
    const url = `${base_url}/trabajos/${trabajo.id}`;
    return this.http.delete(url, this.headers);
  }
  dataGrafico(desde: string, hasta: string): any {
    var data = {
      desde,
      hasta,
    };
    const url = `${base_url}/graficos`;
    return this.http.post(url, data, this.headers);
  }
  getTrabajoUser(iduser: number) {
    const url = `${base_url}/trabajos/usuario`;
    return this.http.post(url, { iduser }, this.headers);
  }
}
