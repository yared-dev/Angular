import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Productos } from '../models/productos.model';
import { Trabajo } from '../models/trabajo.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}
  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }
  private transformarProductos(resultados: any[]): Productos[] {
    return resultados.map(
      (producto) =>
        new Productos(
          producto.nombre,
          producto.precio,
          producto.cantidad,
          producto.img,
          producto._id
        )
    );
  }
  private transformarTrabajos(resultados: any[]): Trabajo[] {
    return resultados.map(
      (trabajo) =>
        new Trabajo(
          trabajo.estado,
          trabajo._id,
          trabajo.nombre,
          trabajo.modelo,
          trabajo.telefono,
          trabajo.precio,
          trabajo.description,
          trabajo.urgencia,
          trabajo.date
        )
    );
  }
  buscar(
    tipo: 'usuarios' | 'trabajos' | 'productos' | 'medicos',
    termino: string
  ) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
          case 'productos':
            return this.transformarProductos(resp.resultados);
          case 'trabajos':
            return this.transformarTrabajos(resp.resultados);
          default:
            return [];
        }
      })
    );
  }
}
