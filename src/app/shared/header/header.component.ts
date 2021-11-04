import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public imgUrl? = '';
  public name? = '';
  public email?: string ;
  constructor(private usuarioServide: UsuariosService) {
    this.imgUrl = usuarioServide.usuario?.getImg;
    this.name = usuarioServide.usuario?.getName;
    this.email = usuarioServide.usuario?.getEmail;
  }

  logout() {
    this.usuarioServide.logout();
  }
}
