import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent {
  public trabajos = {
    on: 'asdasd',
    os: 'asdasd',
    as: 'asdasd',
    ds: 'asdasd',
    s: 'dasd',
    d: 'asdasd',
    aasds: 'asdasd',
    dss: 'asdasd',
    ass: 'asdasd',
    dsas: 'asdasd',
    asw: 'asdasd',
  };
  constructor() {}

  data = Object.values(this.trabajos);
}
