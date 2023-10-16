import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { UsuariosService } from './usuarios.service';
import { PagoDiario } from '../interfaces/pagos.interfaces';
const base_url = environment.base_url + '/pagos/';

@Injectable({
  providedIn: 'root',
})
export class PagoDiarioService {
  public usuario?: Usuario;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuariosService
  ) {
    this.usuario = usuarioService.usuario;
  }

  get token() {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.usuario?.id;
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  enviarPago(data: PagoDiario) {
    const url = `${base_url}`;
    const datos = {
      iduser: data.iduser,
      fecha: this.formatDate(data.fecha),
      monto: data.monto,
    };
    return this.http.post(url, datos, this.headers);
  }
  getPagosByUser(iduser: number) {
    const url = `${base_url}usuario`;
    return this.http.post(url, { iduser }, this.headers);
  }
}
