import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent {
  @Input() title: string = 'sin titulo';
  // Doughnut
  @Input('label') doughnutChartLabels: Label[] = ['1', '2', '3es'];
  @Input('data') doughnutChartData: MultiDataSet = [[24, 24, 24]];

  @Input('colors') colors: Color[] = [
    { backgroundColor: ['red', 'blue', 'yellow'] },
  ];
}
