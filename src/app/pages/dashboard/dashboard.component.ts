import { Component, OnInit } from '@angular/core';

import { Trabajo } from 'src/app/models/trabajo.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { TrabajosService } from 'src/app/services/trabajos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent {
  public cargando: boolean = true;
  public paginaDesde: number = 0;
  public trabajoTemporal: Trabajo[] = [];
  public trabajo: Trabajo[] = [];
  public totalTrabajos: number = 0;
  constructor(
    private busquedaService: BusquedasService,
    private trabajoServices: TrabajosService,
    private usuarioServices: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cargarTrabajo();
  }

  cargarTrabajo() {
    this.cargando = true;
    this.trabajoServices
      .cargarTrabajo(this.paginaDesde, false)
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
  async crearTrabajo() {
    const { value = '' } = await Swal.fire<string[]>({
      title: 'Crea un nuevo Trabajo',
      html:
        '<div>Nombre:</div><input   type="text" id="swal-input1" class="swal2-input mb-2">' +
        '<div>Modelo:</div><input   type="text" id="swal-input2" class="swal2-input mb-2">' +
        '<div>Telefono:</div><input type="number" id="swal-input3" class="swal2-input mb-2">' +
        '<div>Precio:</div><input type="number" id="swal-input4" class="swal2-input mb-2">' +
        '<div>Descripcion:</div><input type="text" id="swal-input5" class="swal2-input mb-2">' +
        '<div>Hora Entrega:</div><input type="time" id="swal-input6" class="swal2-input mb-2">',
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value,
          (<HTMLInputElement>document.getElementById('swal-input4')).value,
          (<HTMLInputElement>document.getElementById('swal-input5')).value,
          (<HTMLInputElement>document.getElementById('swal-input6')).value,
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
      const iduser = this.usuarioServices.id;
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
  check(trabajo: Trabajo) {
    trabajo.estado = true;
    this.trabajoServices.actualizarTrabajo(trabajo).subscribe((resp: any) => {
      const Toast = Swal.mixin({
        toast: true,
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
      this.cargarTrabajo();
    });
  }
}
