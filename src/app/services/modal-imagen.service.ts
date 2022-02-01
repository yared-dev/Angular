import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'trabajos' | 'hospitales' | 'medicos' | undefined;
  public id: string = '';
  public img: string = '';
  public nuevaImg: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  get ocultarModal() {
    return this._ocultarModal;
  }
  abrirModal(
    tipo: 'usuarios' | 'trabajos' | 'hospitales' | 'medicos',
    id: any,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }
  cerrarModal() {
    return (this._ocultarModal = true);
  }
}
