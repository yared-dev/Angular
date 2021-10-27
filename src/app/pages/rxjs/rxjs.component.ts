import { Component, OnDestroy } from '@angular/core';
import { retry, take, map, filter } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;
  constructor() {
    let i = -1;
    this.intervalSubs = this.retornarIntervalo().subscribe((e) =>
      console.log({ e })
    );
  }
  retornarIntervalo(): Observable<number> {
    return interval(100).pipe(
      // take(10),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
}
