import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progreso: number = 10;
  progreso1: number = 10;

  get getProgreso() {
    return `${this.progreso}%`;
  }
  get getProgreso1() {
    return `${this.progreso1}%`;
  }
}
