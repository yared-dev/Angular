import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, map, filter } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';
import { HorariosService } from 'src/app/services/horarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy, OnInit {
  public isDate: Boolean;

  constructor(
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
    this.horariosService.enviarHoraEntrada(tipo_asistencia).subscribe(
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

  ngOnInit(): void {
    this.getDate();
  }
  ngOnDestroy(): void {}
}
