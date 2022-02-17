import { environment } from 'src/environments/environment';

export interface ProductoInterface {
  ok: boolean;
  producto: Productos[];
  total: number;
}

const api_url = environment.base_url;
export class Productos {
  constructor(
    public nombre: string,
    public precio: number,
    public cantidad: number,
    public _id: string,
    public img: string
  ) {}

  get getNombre() {
    return this.nombre;
  }
  get getPrecio() {
    return this.precio;
  }
}
