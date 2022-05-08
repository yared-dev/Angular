import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { HorariosService } from 'src/app/services/horarios.service';
import { TrabajosService } from 'src/app/services/trabajos.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent implements OnInit {
  constructor(private trabajoService: TrabajosService) {}
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public fecha: Date = new Date();
  public barChartLabels: any = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any;
  public desde: any;
  public hasta: any;
  ngOnInit() {
    var date = new Date();
    this.desde = new Date(date.getFullYear(), date.getMonth(), 1);
    this.hasta = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getEmpleadoTrabajo();
  }

  getEmpleadoTrabajo() {
    this.desde = new Date(this.desde);
    this.hasta = new Date(this.hasta);
    var pri = this.desde.toISOString().slice(0, 10);
    var ul = this.hasta.toISOString().slice(0, 10);
    this.barChartData = [
      {
        data: [1000],
        label: 'Meta Mensual Ventas',
        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
        borderWidth: 0,
      },
    ];
    this.trabajoService.dataGrafico(pri, ul).subscribe((resp: any) => {
      for (let clave in resp.grafic) {
        let color = 'rgba(255, 99, 132, 0.2)';
        if (clave == '1') {
          color = 'rgba(54, 162, 235, 0.2)';
        }
        var data = {
          data: [resp.grafic[clave].sum],
          label: resp.grafic[clave].name,
          backgroundColor: [color],
          borderColor: ['rgb(0, 99, 132)'],
          borderWidth: 1,
        };
        this.barChartData.push(data);
      }
      console.log(this.barChartData);
    });
  }
}
