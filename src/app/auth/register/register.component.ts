import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { ValidarpassDirective } from './validarpass';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;
  public registerForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl('yared', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('yared@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('1234', [Validators.required]),
      password2: new FormControl('1234', [Validators.required]),
      terminos: new FormControl(true, Validators.requiredTrue),
    },
    {
      validators: ValidarpassDirective,
    }
  );
  constructor(
    private userService: UsuariosService,
    private router: Router
  ) {}

  crearUsuario() {
    this.formSubmitted = true;

    console.log(this.registerForm.valid);

    if (this.registerForm.invalid) {
      return;
    }
    //si es valido contnuar
    this.userService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        //si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  camporNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }
  ngOnInit(): void {}
}
