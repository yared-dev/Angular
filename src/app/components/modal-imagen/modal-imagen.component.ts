import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir!: File;
  public imgTemp: any;

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadServices: FileUploadService
  ) {}

  ngOnInit(): void {}
  cerrarModal() {
    this.imgTemp = '';
    this.modalImagenService.cerrarModal();
  }
  cambiarImg(e: any) {
    this.imagenSubir = e.target.files[0];
    if (!this.imagenSubir) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    return;
  }
  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadServices
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((res) => {
        Swal.fire('Guardado', 'Imagen Actualizada', 'success');
        this.modalImagenService.nuevaImg.emit(res);
        this.cerrarModal();
      })
      .catch((e) => Swal.fire('Error', e.error.msg, 'error'));
  }
}
