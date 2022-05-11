import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Productos } from 'src/app/models/productos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [],
})
export class ProductosComponent implements OnInit, OnDestroy {
  public productos: Productos[] = [];
  public productosTemp: Productos[] = [];
  public totalProductos: number = 0;
  public paginaDesde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription | undefined;

  constructor(
    private productoService: ProductosService,
    private modalImgServices: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarProductos();

    this.imgSubs = this.modalImgServices.nuevaImg
      .pipe(delay(50))
      .subscribe((img) => this.cargarProductos());
  }
  cargarProductos() {
    this.cargando = true;

    this.productoService
      .cargarProductos(this.paginaDesde)
      .subscribe(({ total, productos }) => {
        this.totalProductos = total;
        this.cargando = false;
        this.productos = productos;
        this.productosTemp = productos;
      });
  }
  abrirModal(producto: Productos) {
    this.modalImgServices.abrirModal(
      'productos',
      producto.idproduct,
      producto.img
    );
  }
  async abrirAlertCrearProducto() {
    const { value = '' } = await Swal.fire<string[]>({
      title: 'Crea un nuevo Producto',
      html:
        '<div>Nombre:</div><input   type="text" id="swal-input1" class="swal2-input mb-2">' +
        '<div>Precio:</div><input   type="number" id="swal-input2" class="swal2-input mb-2">' +
        '<div>Cantidad:</div><input type="number" id="swal-input3" class="swal2-input mb-2">',
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1'))?.value,
          (<HTMLInputElement>document.getElementById('swal-input2'))?.value,
          (<HTMLInputElement>document.getElementById('swal-input3'))?.value,
        ];
      },
    });
    if (value.length > 0) {
      const nombre = value[0].toString();
      const precio = parseInt(value[1]);
      const cantidad = parseInt(value[2]);
      this.productoService
        .crearProductos({ name: nombre, price: precio, cant: cantidad })
        .subscribe((resp: any) => {
          this.cargarProductos();
          Swal.fire('Creado!', 'producto creado', 'success');
        });
    }
  }
  buscar(termino: string) {
    if (termino.length == 0) {
      return (this.productos = this.productosTemp);
    } else {
      return this.busquedaService
        .buscar('productos', termino)
        .subscribe((resp: any) => (this.productos = resp));
    }
  }
  cambiarPagina(valor: number) {
    this.paginaDesde += valor;
    if (this.paginaDesde <= 0) {
      this.paginaDesde = 0;
    } else if (this.paginaDesde > this.totalProductos) {
      this.paginaDesde -= valor;
    } else if (this.paginaDesde === this.totalProductos) {
      this.paginaDesde = 0;
    }
    this.cargarProductos();
  }
  borrarProducto(producto: Productos) {
    this.productoService
      .borrarProductos(producto.idproduct)
      .subscribe((resp: any) => {
        const { msg } = resp;
        this.cargarProductos();
        Swal.fire('Borrado!', msg, 'success');
      });
  }
  editarProducto(producto: Productos) {
    this.productoService
      .actualizarProductos(producto)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado!', 'producto actualizado', 'success');
      });
  }
}
