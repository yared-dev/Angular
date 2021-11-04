import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

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

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/login/renew-token`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, nombre, role, uid, img = '' } = resp.usuarioDB;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error: any) => of(false))
      );
  }
  crearUsuario(formData: registerForm) {
    return this.http.post(`${base_url}/usuarios`, formData);
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
}
