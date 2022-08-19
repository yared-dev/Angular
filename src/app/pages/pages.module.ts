import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//mismodulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagosComponent } from './pagos/pagos.component';
import { HorariosComponent } from './horarios/horario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { TrabajosComponent } from './mantenimientos/trabajos/trabajos.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PagosComponent,
    HorariosComponent,
    PerfilComponent,
    UsuariosComponent,
    TrabajosComponent,
    ProductosComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PagosComponent,
    AccountSettingsComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
  ],
})
export class PagesModule {}
