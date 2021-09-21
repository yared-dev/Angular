import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }
  //para renombrar un input se hace con eso "valor"
  @Input('valor') progress: number = 30;
  @Input() btnClass: string = 'btn-primary';

  @Output() out_value: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {
    this.progress += valor;
    this.out_value.emit(this.progress);

    if (this.progress > 100) {
      this.out_value.emit(100);
      this.progress = 100;
    } else if (this.progress < 0) {
      this.out_value.emit(0);

      this.progress = 0;
    }
  }
  onChange(valor: number) {
    if (valor >= 100) {
      valor = 100;
    } else if (valor <= 0) {
      valor = 0;
    }
    this.out_value.emit(valor);
  }
}
