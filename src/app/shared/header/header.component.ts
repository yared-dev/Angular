import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public usuario?: Usuario;

  constructor(private usuarioService: UsuariosService) {}

  logout() {
    this.usuarioService.logout();
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }
}
