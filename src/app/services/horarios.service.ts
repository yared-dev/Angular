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
  enviarHoraEntrada(tipo_asistencia: string = '') {
    console.log(this.uid);
    return this.http.post(
      `${base_url}/horarios`,
      { id: this.uid, tipo_asistencia: tipo_asistencia },
      this.headers
    );
  }
  get_data_horario() {
    const url = `${base_url}/graficos/horario`;
    return this.http.get(url, this.headers);
  }
  getHorasTrabajadas() {
    const url = `${base_url}/horarios`;
    return this.http.get(url, this.headers);
  }
}
