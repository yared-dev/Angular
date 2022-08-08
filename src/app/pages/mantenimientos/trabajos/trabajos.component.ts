import { Component, OnInit } from '@angular/core';
import { Trabajo } from 'src/app/models/trabajo.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { TrabajosService } from 'src/app/services/trabajos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styles: [],
})
export class TrabajosComponent implements OnInit {
  public cargando: boolean = true;
  public paginaDesde: number = 0;
  public trabajoTemporal: Trabajo[] = [];
  public trabajo: Trabajo[] = [];
  public usuarios: any;
  public totalTrabajos: number = 0;
  constructor(
    private busquedaService: BusquedasService,
    private trabajoServices: TrabajosService,
    private usuarioServices: UsuariosService
  ) {}

  ngOnInit(): void {
    this.usuarioServices.cargarUsuarios().subscribe((resp) => {
      this.usuarios = resp.usuarios;
    });
    this.cargarTrabajo();
  }

  cargarTrabajo() {
    this.cargando = true;
    this.trabajoServices
      .cargarTrabajo(this.paginaDesde, true)
      .subscribe(({ total, trabajos }) => {
        this.cargando = false;
        this.trabajo = trabajos;
        this.totalTrabajos = total;
        this.trabajoTemporal = trabajos;
      });
  }
  buscar(termino: string) {
    if (termino.length == 0) {
      console.log(this.trabajoTemporal);
      return (this.trabajo = this.trabajoTemporal);
    } else {
      return this.busquedaService
        .buscar('trabajos', termino)
        .subscribe((resp: any) => (this.trabajo = resp));
    }
  }
  async crearTrabajo() {
    var options = '';
    this.usuarios.forEach((element: any) => {
      console.log(element.name);
      options += `<option value="${element.id}">${element.name}</option>`;
    });
    const { value = '' } = await Swal.fire<string[]>({
      title: 'Crea un nuevo Trabajo',
      html:
        '<div>Nombre:</div><input   type="text" id="swal-input1" class="swal2-input mb-2">' +
        '<div>Modelo:</div><input   type="text" id="swal-input2" class="swal2-input mb-2">' +
        '<div>Telefono:</div><input type="number" id="swal-input3" class="swal2-input mb-2">' +
        '<div>Precio:</div><input type="number" id="swal-input4" class="swal2-input mb-2">' +
        '<div>Descripcion:</div><input type="text" id="swal-input5" class="swal2-input mb-2">' +
        '<div>Urgencia:</div><input type="text" id="swal-input6" class="swal2-input mb-2">' +
        `<div>Trabajador:</div><select id="swal-input7" class="swal2-input mb-2">${options}</select>`,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value,
          (<HTMLInputElement>document.getElementById('swal-input4')).value,
          (<HTMLInputElement>document.getElementById('swal-input5')).value,
          (<HTMLInputElement>document.getElementById('swal-input6')).value,
          (<HTMLInputElement>document.getElementById('swal-input7')).value,
        ];
      },
    });

    if (value.length > 0) {
      const name = value[0];
      const model = value[1].toString();
      const phone_number = parseInt(value[2]);
      const price = parseInt(value[3]);
      const description = value[4].toString();
      const priority = value[5].toString();
      const estate = false;
      const iduser = value[6].toString();
      this.trabajoServices
        .crearTarabjo({
          name,
          model,
          phone_number,
          price,
          description,
          priority,
          estate,
          iduser,
        })
        .subscribe((resp) => {
          this.cargarTrabajo();
        });
    }
  }
  cambiarPagina(valor: number) {
    this.paginaDesde += valor;
    if (this.paginaDesde <= 0) {
      this.paginaDesde = 0;
    } else if (this.paginaDesde > this.totalTrabajos) {
      this.paginaDesde -= valor;
    } else if (this.paginaDesde === this.totalTrabajos) {
      this.paginaDesde = 0;
    }
    this.cargarTrabajo();
  }
  borrarTrabajo(trabajo: Trabajo) {
    this.trabajoServices.borrarTrabajo(trabajo).subscribe((res: any) => {
      const { msg } = res;
      this.cargarTrabajo();
      Swal.fire('Borrado!', msg, 'success');
    });
  }
  actualizarTrabajo(trabajo: Trabajo) {
    this.trabajoServices.actualizarTrabajo(trabajo).subscribe((resp: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'success',
        title: resp.ok + ' Actualizado',
      });
    });
  }
}
