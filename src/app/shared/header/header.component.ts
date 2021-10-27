import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private usuarioServide: UsuariosService) {}

  logout() {
    this.usuarioServide.logout();
  }
}
