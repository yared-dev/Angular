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
    return this.usuario?.uid;
  }

  enviarHoraEntrada(hour: number) {
    return this.http.put(`${base_url}/horarios/${this.uid}`, hour, {
      headers: {
        'x-token': this.token,
      },
    });
  }
}
