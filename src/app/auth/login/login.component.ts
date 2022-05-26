import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuariosService } from 'src/app/services/usuarios.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('1234', [Validators.required]),
    remember: new FormControl('false'),
  });

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    // this.renderButton();
  }

  login() {
    this.usuariosService.loginUsuario(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          this.router.navigateByUrl('/');
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.usuariosService.googleInit();
    this.auth2 = this.usuariosService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuariosService.loginGoogle(id_token).subscribe((res) => {
          this.ngZone.run(() => {
            console.log('entre pero nunca navegue');
            this.router.navigateByUrl('/');
          });
        });
        //redireccion porque se autentico
      },
      function (error: any) {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
