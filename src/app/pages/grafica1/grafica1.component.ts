import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public label1: string[] = ['Pantallas', 'Repuestos', 'Microscopios'];
  public data1 = [[350, 450, 100]];
  public colors1 = [{ backgroundColor: ['#6857e6', '#009fee', '#f02059'] }];

  //empleados
  public label2: string[] = ['Yegor', 'Bryan', 'Kevin', 'Kendry', 'Oscar'];
  public data2 = [[300, 250, 700, 100, 500]];
  public colors2 = [
    {
      backgroundColor: ['#6857e5', '#009fea', '#f22056', '#f58356', '#f8166'],
    },
  ];

  public label3: string[] = ['Gastos Mensuales', 'Presupuesto'];
  public data3 = [[800, 6000]];
  public colors3 = [{ backgroundColor: ['#6857e4', 'black'] }];
}
