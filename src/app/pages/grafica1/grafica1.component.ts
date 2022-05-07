import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { TrabajosService } from 'src/app/services/trabajos.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  // public label1: string[] = ['Pantallas', 'Repuestos', 'Microscopios'];
  // public data1 = [[350, 450, 100]];
  // public colors1 = [{ backgroundColor: ['#6857e6', '#009fee', '#f02059'] }];

  //empleados
  public label2: string[] = [];
  public data2: any = [[]];
  public colors2 = [
    {
      backgroundColor: ['#6857e5', '#009fea', '#f22056', '#f58356', '#f8166'],
    },
  ];
  // fin de empleados
  // compras
  public label3: string[] = [];
  public data3: any = [[]];
  public colors3 = [{ backgroundColor: ['#6857e4', 'black'] }];
  // fin de compras
  constructor(
    private trabajoService: TrabajosService,
    private productoService: ProductosService,
    private horariosService: HorariosService
  ) {}

  ngOnInit(): void {
    this.getEmpleadoTrabajo();
    this.getProductoStock();
    this.getHorariosSemanal();
  }
  getEmpleadoTrabajo() {
    this.trabajoService.dataGrafico().subscribe((resp: any) => {
      for (let clave in resp.a) {
        this.label2.push(clave);
        this.data2[0].push(resp.a[clave]);
      }
    });
  }
  getProductoStock() {
    this.productoService.totalProductos().subscribe((resp: any) => {
      resp.total.forEach((productos: any) => {
        this.label3.push(productos._id.nombre);
        this.data3[0].push(productos.totalPrice);
      });
    });
  }
  getHorariosSemanal() {}
}
