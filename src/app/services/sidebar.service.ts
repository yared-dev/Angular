import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'PRINCIPAL',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'trabajos',
          url: '/',
        },
        // {
        //   title: 'Meta del Mes',
        //   url: 'progress',
        // },
        {
          title: 'Grafica de Trabajos',
          url: 'grafica1',
        },
        {
          title: 'Pagos Diario',
          url: 'pagos',
        },
        {
          title: 'Marcar Asistencia',
          url: 'rxjs',
        },
      ],
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuarios',
          url: 'usuarios',
        },
        {
          title: 'Trabajos',
          url: 'trabajos',
        },
        {
          title: 'Productos',
          url: 'productos',
        },
      ],
    },
  ];

  constructor() {}
}
