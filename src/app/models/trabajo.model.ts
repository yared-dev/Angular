import { environment } from 'src/environments/environment';

const api_url = environment.base_url;

export interface TrabajoUserInterface {
  ok: boolean;
  trabajo: Trabajo[];
  total: number;
}

export class Trabajo {
  constructor(
    public nombre: string,
    public modelo: string,
    public telefono: number,
    public description: string,
    public precio: number,
    public urgencia: string,
    public date: string,
    public _id: string,
    public usuario: string
  ) {}

  get getUid() {
    return this._id;
  }
}
