import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public label1: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public data1 = [[350, 450, 100]];
  public colors1 = [{ backgroundColor: ['#6857e6', '#009fee', '#f02059'] }];

  //empleados
  public label2: string[] = ['Spiderman', 'Superman', 'Batman'];
  public data2 = [[300, 250, 700]];
  public colors2 = [{ backgroundColor: ['#6857e5', '#009fea', '#f02056'] }];

  public label3: string[] = ['Marvel', 'Dc', 'Hbo'];
  public data3 = [[350, 950, 100]];
  public colors3 = [{ backgroundColor: ['#6857e4', '#009fet', '#f02056'] }];
}
