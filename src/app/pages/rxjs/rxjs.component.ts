import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HorariosService } from 'src/app/services/horarios.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  // styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy, OnInit {
  public isDate: Boolean;

  public totalUsers: Usuario[] = [];
  public seleccionados: any = 1;
  public cantidad: number = 0;
  public trabajoUsuarios: any[] = [];
  constructor(
    private usuarioServices: UsuariosService,
    private horariosService: HorariosService,
    private router: Router
  ) {
    this.isDate = false;
  }

  getDate() {
    const d = new Date();
    let hour = d.getHours();
    //modificar la hora de entrada maxima
    if (hour < 24) {
      this.isDate = true;
      return hour;
    }
    return 0;
  }
  enviarHoraEntrada() {
    var fechaActual = new Date();
    var horaEntrada = new Date(`${fechaActual.toDateString()} 14:00:00`);
    var horaSalida = new Date(`${fechaActual.toDateString()} 20:00:00`);
    var tipo_asistencia = '';

    if (fechaActual < horaEntrada) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Entrada',
        showConfirmButton: false,
        timer: 2000,
      });
      tipo_asistencia = 'E';
    } else if (fechaActual > horaEntrada && fechaActual < horaSalida) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salida',
        showConfirmButton: false,
        timer: 2000,
      });
      tipo_asistencia = 'S';
    } else if (fechaActual > horaEntrada) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Dia no laburado',
        showConfirmButton: false,
        timer: 2000,
      });
      tipo_asistencia = 'V';
    }
    var data = {
      tipo_asistencia,
      idusers: this.seleccionados,
    };
    this.horariosService.enviarHoraEntrada(data).subscribe(
      (resp) => {
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 2000);
      },
      (err) => {
        //si sucede un error
        Swal.fire('Error', err.error, 'error');
      }
    );
  }
  getTotalUsers() {
    this.usuarioServices.cargarUsuarios().subscribe((res) => {
      this.totalUsers = res.usuarios;
      this.seleccionados = res.usuarios[0].id || undefined; //para inicializar el combo
    });
  }
  getPagosByUser() {
    this.seleccionados;
  }

  ngOnInit(): void {
    this.getTotalUsers();
    this.getDate();
  }
  ngOnDestroy(): void {}
}
