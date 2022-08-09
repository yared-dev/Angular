import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { UsuariosService } from './usuarios.service';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
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
  enviarHoraEntrada(data: {
    tipo_asistencia: string;
    idusers: number;
    date?: string;
  }) {
    let dt = new Date();
    var fecha_hora = this.formatDate(dt);
    var hora = dt.getHours();
    var minutos = dt.getMinutes();
    var segundos = dt.getSeconds();
    var date = fecha_hora + ' ' + hora + ':' + minutos + ':' + segundos;
    data.date = date;
    return this.http.post(`${base_url}/horarios`, data, this.headers);
  }
  get_data_horario() {
    const url = `${base_url}/graficos/horario`;
    return this.http.get(url, this.headers);
  }
  getHorasTrabajadas() {
    const url = `${base_url}/horarios`;
    return this.http.get(url, this.headers);
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
}
