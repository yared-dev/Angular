import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { HorarioComponent } from './horario/horario.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    HorarioComponent,
  ],
  imports: [CommonModule, ChartsModule, FormsModule],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    HorarioComponent,
  ],
})
export class ComponentsModule {}
