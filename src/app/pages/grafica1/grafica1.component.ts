import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  constructor(private horariosService: HorariosService) {}
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public fecha: Date = new Date();
  public barChartLabels: any = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any;
  public empleados: any = [];
  ngOnInit() {
    this.getHorasTrabjadas();
  }

  getHorasTrabjadas() {
    this.barChartData = [
      {
        data: [240],
        label: 'Meta Mensual Horas Trabajadas',
        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
        borderWidth: 0,
      },
    ];
    this.horariosService.getHorasTrabajadas().subscribe((resp: any) => {
      console.log("🚀 ~ Grafica1Component ~ this.horariosService.getHorasTrabajadas ~ resp:", resp)
      let color = 'rgba(255, 99, 132, 0.2)';
      for (let clave in resp.horario) {
        if (clave == '1') {
          color = 'rgba(54, 162, 235, 0.2)';
        }
        var data = {
          data: [(resp.horario[clave].diferencia.hours + (resp.horario[clave].diferencia.minutes/100)).toFixed(2)],
          label: resp.horario[clave].name,
          backgroundColor: [color],
          borderColor: ['rgb(0, 99, 132)'],
          borderWidth: 1,
        };
        var datos = {
          nombre: resp.horario[clave].name,
          pago: ((resp.horario[clave].diferencia.hours + (resp.horario[clave].diferencia.minutes/100))* 4.16).toFixed(2),
        };
        this.empleados.push(datos);
        this.barChartData.push(data);
      }
    });
  }
}
