import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, map, filter } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';
import { HorariosService } from 'src/app/services/horarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
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
    if (hour < 17) {
      this.isDate = true;
      return hour;
    }
    return 0;
  }
  enviarHoraEntrada() {
    var fechaActual = new Date();
    var fechaComparar = new Date(`${fechaActual.toDateString()} 12:00:00`);
    if (fechaActual > fechaComparar) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Llegaste tarde basura',
        showConfirmButton: false,
        timer: 600,
      });
    }

    this.horariosService.enviarHoraEntrada().subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
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
