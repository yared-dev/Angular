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
  public intervalSubs: Subscription;
  public isDate: Boolean;

  constructor(
    private horariosService: HorariosService,
    private router: Router
  ) {
    this.isDate = false;
    this.intervalSubs = this.retornarIntervalo().subscribe((e) =>
      console.log({ e })
    );
  }
  retornarIntervalo(): Observable<number> {
    return interval(100).pipe(
      take(10),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  getDate() {
    const d = new Date();
    let hour = d.getHours();
    if (hour < 12) {
      this.isDate = true;

      return hour;
    }
    return 0;
  }
  enviarHoraEntrada() {
    console.log('entre a esta hora');
    if (this.getDate() === 0) {
      return;
    }
    //si es valido contnuar
    this.horariosService.enviarHoraEntrada(this.getDate()).subscribe(
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
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
}
