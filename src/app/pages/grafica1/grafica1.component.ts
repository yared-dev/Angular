import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  // // public label1: string[] = ['Pantallas', 'Repuestos', 'Microscopios'];
  // // public data1 = [[350, 450, 100]];
  // // public colors1 = [{ backgroundColor: ['#6857e6', '#009fee', '#f02059'] }];

  // //empleados
  // public label2: string[] = [];
  // public data2: any = [[]];
  // public colors2 = [
  //   {
  //     backgroundColor: ['#6857e5', '#009fea', '#f22056', '#f58356', '#f8166'],
  //   },
  // ];
  // // fin de empleados
  // // compras
  // public label3: string[] = ['yared'];
  // public data3: any = [[30]];
  // public colors3 = [{ backgroundColor: ['#6857e4', 'black'] }];
  // // fin de compras

  // ngOnInit(): void {
  //   this.getProductoStock();
  // }

  // getProductoStock() {
  //   this.horariosService.getHorasTrabajadas().subscribe((resp: any) => {
  //     resp.total.forEach((productos: any) => {
  //       this.label3.push(productos._id.nombre);
  //       this.data3[0].push(productos.totalPrice);
  //     });
  //   });
  // }
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
      console.log(resp.horario);
      for (let clave in resp.horario) {
        let color = 'rgba(255, 99, 132, 0.2)';
        if (clave == '1') {
          color = 'rgba(54, 162, 235, 0.2)';
        }
        var data = {
          data: [resp.horario[clave].diferencia.hours],
          label: resp.horario[clave].name,
          backgroundColor: [color],
          borderColor: ['rgb(0, 99, 132)'],
          borderWidth: 1,
        };
        var datos = {
          nombre: resp.horario[clave].name,
          pago: resp.horario[clave].diferencia.hours * 4.16,
        };
        this.empleados.push(datos);
        this.barChartData.push(data);
      }
    });
  }
}
