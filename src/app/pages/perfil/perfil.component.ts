import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public usuario?: Usuario;
  public perfilForm!: FormGroup;
  public imagenSubir!: File;
  public imgTemp: any;
  constructor(
    private usuarioService: UsuariosService,
    private fileUploadServices: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = new FormGroup({
      name: new FormControl(this.usuario?.name, [Validators.required]),
      email: new FormControl(this.usuario?.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.perfilForm?.value).subscribe(
      () => {
        const { name, email } = this.perfilForm?.value;
        this.usuario!.name = name;
        this.usuario!.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      (err: any) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  cambiarImg(e: any) {
    this.imagenSubir = e.target.files[0];
    if (!this.imagenSubir) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    return;
  }
  subirImagen() {
    this.fileUploadServices
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario?.id)
      .then((res) => {
        this.usuario!.img = res;
        Swal.fire('Guardado', 'Imagen Actualizada', 'success');
      })
      .catch((e) => Swal.fire('Error', e.error.msg, 'error'));
  }
}
