import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartType } from 'chart.js';
import { Usuario } from 'src/app/models/usuario.model';
import { HorariosService } from 'src/app/services/horarios.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  public totalUsers: Usuario[] = [];
  public seleccionados: any;
  cantidadApotada: number = 0;
  constructor(
    private horarrioService: HorariosService,
    private usuarioServices: UsuariosService
  ) {}
  ngOnInit(): void {
    this.getTotalUsers();
  }

  getTotalUsers() {
    this.usuarioServices.cargarUsuarios().subscribe((res) => {
      this.totalUsers = res.usuarios;
      this.seleccionados = res.usuarios[0].id;
    });
  }
  enviarPago() {
    if (this.cantidadApotada == 0) {
      console.log(this.seleccionados);
      console.log(this.cantidadApotada);
    }
    Swal.fire('Error', 'El Monto debe ser mayor a 0', 'question');
  }
}
