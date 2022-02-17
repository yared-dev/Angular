import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductoInterface, Productos } from '../models/productos.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
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
  cargarProductos(desde: number = 0) {
    const url = `${base_url}/productos?desde=${desde}`;

    return this.http.get<ProductoInterface>(url, this.headers).pipe(
      delay(300),
      map((resp) => {
        const productos = resp.producto.map((productos: any) => {
          return new Productos(
            productos.nombre,
            productos.precio,
            productos.cantidad,
            productos._id,
            productos.img
          );
        });
        return { total: resp.total, productos };
      })
    );
  }
  crearProductos(data: { nombre: string; precio: number; cantidad: number }) {
    console.log(data);
    const url = `${base_url}/productos`;
    return this.http.post(url, data, this.headers);
  }
  actualizarProductos(
    _id: string,
    data: { nombre: string; precio: number; cantidad: number }
  ) {
    const url = `${base_url}/productos/${_id}`;
    return this.http.put(url, data, this.headers);
  }
  borrarProductos(_id: string) {
    const url = `${base_url}/productos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
