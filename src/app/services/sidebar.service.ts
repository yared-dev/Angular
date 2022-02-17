import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/',
        },
        {
          title: 'ProgressBar',
          url: 'progress',
        },
        {
          title: 'Graficas',
          url: 'grafica1',
        },
        {
          title: 'Promesas',
          url: 'promesas',
        },
        {
          title: 'Rxjs',
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
