import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent {
  // scatter
  public bubbleChartType: ChartType = 'bubble';

  times: any = [
    '00:00 am',
    '07:00 am',
    '08:00 am',
    '09:00 am',
    '10:00 am',
    '11:00 pm',
  ];
  dia: any = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 5,
            callback: (value) => this.dia[value],
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 5,
            callback: (value) => this.times[value],
          },
        },
      ],
    },
  };

  @Input('data') bubbleChartData: ChartDataSets[] = [];

  public bubbleChartLegend = true;
}
