import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { registerForm } from '../interfaces/register-form.interfaces';
import { loginForm } from '../interfaces/login-form.interfaces';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public auth2: any;
  public usuario?: Usuario;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    // this.googleInit();
  }
  get token() {
    return localStorage.getItem('token') || '';
  }
  get role() {
    const resp = this.usuario?.role || undefined;
    return resp;
  }
  get id() {
    return this.usuario?.id;
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew-token`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          console.log(resp.usuarioDB);
          const { email, name, role, id_user, img } = resp.usuarioDB;
          this.usuario = new Usuario(name, email, '', img, role, id_user);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error: any) => of(false))
      );
  }
  crearUsuario(formData: registerForm) {
    return this.http.post(`${base_url}/usuarios`, formData);
  }
  actualizarUsuario(data: { email: string; nombre: string; role: string }) {
    data = { ...data, role: this.usuario?.role || '' };
    return this.http.put(`${base_url}/usuarios/${this.id}`, data, this.headers);
  }
  loginUsuario(formData: loginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  googleInit() {
    return new Promise((resolve: any) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '279082280198-bdtli0jths9hc97kqf2l7hf4k8qdc2de.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    // this.auth2.signOut().then(() => {
    //   this.ngZone.run(() => {
    //   });
    // });
  }
  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http
      .get<{ total: number; usuarios: Usuario[] }>(url, this.headers)
      .pipe(
        delay(500),
        map((resp) => {
          const usuarios = resp.usuarios.map((user: any) => {
            console.log('user', user);
            return new Usuario(
              user.name,
              user.email,
              '',
              user.img,
              user.role,
              user.id_user
            );
          });
          return { total: resp.total, usuarios };
        })
      );
  }
  eliminarUsuario(usuario: Usuario) {
    console.log('eliminado');
    return this.http.delete(`${base_url}/usuarios/${usuario.id}`, this.headers);
  }
  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.id}`,
      usuario,
      this.headers
    );
  }
}
