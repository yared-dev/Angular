import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  menuItems: any[];
  public imgUrl? = '';
  public name? = '';
  public usuario?: Usuario;
  constructor(
    private sidebarService: SidebarService,
    private userService: UsuariosService
  ) {
    this.menuItems = sidebarService.menu;
    this.imgUrl = userService.usuario?.getImg;
    this.name = userService.usuario?.getName;
  }

  logout() {
    this.userService.logout();
  }
}
