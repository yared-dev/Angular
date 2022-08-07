import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { PagoDiarioService } from 'src/app/services/pago-diario.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
//interfaces
import { PagoDiario } from 'src/app/interfaces/pago-diario.interfaces';
import { Response } from 'src/app/interfaces/resp.interfaces';
import { TrabajosService } from 'src/app/services/trabajos.service';
import { Trabajo } from 'src/app/models/trabajo.model';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  public totalUsers: Usuario[] = [];
  public seleccionados: any = 1;
  public cantidad: number = 0;
  public pagoUsuarios: PagoDiario[] = [];
  public trabajoUsuarios: any[] = [];
  public data: PagoDiario = {
    iduser: 0,
    fecha: new Date(),
    monto: 0,
  };
  constructor(
    private usuarioServices: UsuariosService,
    private pagos: PagoDiarioService,
    private trabajoService: TrabajosService
  ) {}
  ngOnInit(): void {
    this.getTotalUsers();
    this.getPagosByUser();
  }

  getTotalUsers() {
    this.usuarioServices.cargarUsuarios().subscribe((res) => {
      this.totalUsers = res.usuarios;
      this.seleccionados = res.usuarios[0].id || undefined; //para inicializar el combo
    });
  }
  enviarPago() {
    if (this.cantidad == undefined || this.cantidad <= 0) {
      Swal.fire('Error', 'El Monto debe ser mayor a 0', 'error');
    } else {
      this.data.iduser = this.seleccionados;
      this.data.monto = this.cantidad;
      this.pagos.enviarPago(this.data).subscribe((resp: any) => {
        if (resp.ok !== true) {
          Swal.fire(
            'Error',
            'Pago no Realizado Hablar a Sistemas o Intentar otra vez',
            'error'
          );
        }
        this.getPagosByUser();
      });
    }
  }
  getPagosByUser() {
    this.pagos.getPagosByUser(this.seleccionados).subscribe((resp: any) => {
      this.pagoUsuarios = resp.pago;
    });
    this.trabajoService
      .getTrabajoUser(this.seleccionados)
      .subscribe((res: any) => {
        this.trabajoUsuarios = res.trabajo;
      });
  }
}
