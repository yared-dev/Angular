import { environment } from 'src/environments/environment';

export interface ProductoInterface {
  ok: boolean;
  producto: Productos[];
  total: number;
}

const api_url = environment.base_url;
export class Productos {
  constructor(
    public name: string,
    public price: number,
    public cant: number,
    public idproduct: string,
    public img: string
  ) {}

  get getNombre() {
    return this.name;
  }
  get getPrecio() {
    return this.price;
  }
}
