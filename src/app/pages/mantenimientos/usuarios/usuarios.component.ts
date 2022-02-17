import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public paginaDesde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription | undefined;
  constructor(
    private usuarioServices: UsuariosService,
    private busquedaService: BusquedasService,
    private modalImagenServices: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.imgSubs = this.modalImagenServices.nuevaImg
      .pipe(delay(100))
      .subscribe((img) => this.cargarUsuario());
  }
  cargarUsuario() {
    this.cargando = true;
    this.usuarioServices
      .cargarUsuarios(this.paginaDesde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }
  cambiarPagina(valor: number) {
    this.paginaDesde += valor;
    if (this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if (this.paginaDesde > this.totalUsuarios) {
      this.paginaDesde -= valor;
    }
    this.cargarUsuario();
  }
  buscar(termino: string) {
    if (termino.length == 0) {
      console.log(this.usuarios);
      return (this.usuarios = this.usuariosTemp);
    } else {
      return this.busquedaService
        .buscar('usuarios', termino)
        .subscribe((resp: any) => (this.usuarios = resp));
    }
  }
  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioServices.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    return Swal.fire({
      title: 'Esta seguro de eliminar el usuario?',
      text: 'Esta accion es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServices.eliminarUsuario(usuario).subscribe((result) => {
          Swal.fire('Borrado!', 'El Usuario a sido eliminado  .', 'success');
          this.cargarUsuario();
        });
      }
    });
  }
  cambiarRole(usuario: Usuario) {
    this.usuarioServices
      .guardarUsuario(usuario)
      .subscribe((res) => console.log(res));
  }
  abrirModal(usuario: Usuario) {
    console.log(usuario);
    if (usuario.uid === null) {
      usuario.uid = 'da';
    }
    this.modalImagenServices.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
