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
    this.googleInit();
  }
  get token() {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.usuario?.uid;
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
          const { email, google, nombre, role, _id, img = '' } = resp.usuarioDB;
          this.usuario = new Usuario(nombre, email, '', img, google, role, _id);
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
    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
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
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http
      .get<{ total: number; usuarios: Usuario[] }>(url, this.headers)
      .pipe(
        delay(500),
        map((resp) => {
          const usuarios = resp.usuarios.map((user: any) => {
            return new Usuario(
              user.nombre,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user._id
            );
          });
          return { total: resp.total, usuarios };
        })
      );
  }
  eliminarUsuario(usuario: Usuario) {
    console.log('eliminado');
    return this.http.delete(
      `${base_url}/usuarios/${usuario.uid}`,
      this.headers
    );
  }
  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
