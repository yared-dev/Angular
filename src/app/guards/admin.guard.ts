import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.usuarioService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
    // return this.usuarioService.role == 'ADMIN_ROLE' ? true : false;
  }
}