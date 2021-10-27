import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo?: string;
  public tituloSub$?: Subscription;
  constructor(private router: Router) {
    this.tituloSub$ = this.getArgumentoRuta().subscribe(({ titulo }) => {
      console.log(titulo);
      this.titulo = titulo;
      document.title = `Admin-pro-${titulo}`;
    });
  }

  getArgumentoRuta() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
  ngOnDestroy(): void {
    this.tituloSub$?.unsubscribe();
    console.log('dessucrito');
  }
}
