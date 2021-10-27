import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  menuItems: any[];
  constructor(
    private sidebarService: SidebarService,
    private userService: UsuariosService
  ) {
    this.menuItems = sidebarService.menu;
  }

  logout() {
    this.userService.logout();
  }
}
