import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent implements OnInit {
  constructor(private horarrioService: HorariosService) {}
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public fecha: Date = new Date();
  public barChartLabels: any = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any = [
    { data: [], label: 'Yegor' },
    { data: [], label: 'Jonathan' },
    { data: [], label: 'Kendry' },
  ];
  ngOnInit() {
    this.mostrartrabajosMensuales();
  }

  mostrartrabajosMensuales() {
    this.horarrioService.get_data_horario().subscribe((resp: any) => {
      const { jhonatan, yegor, kendry } = resp.emepleados;
      this.barChartLabels.push('Trabajadores');
      this.barChartData[0].data.push(yegor);
      this.barChartData[1].data.push(jhonatan);
      this.barChartData[2].data.push(kendry);
    });
  }
}
