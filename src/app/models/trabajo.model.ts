import { environment } from 'src/environments/environment';

const api_url = environment.base_url;

export interface TrabajoUserInterface {
  ok: boolean;
  trabajo: Trabajo[];
  total: number;
}

export class Trabajo {
  constructor(
    public estado: boolean,
    public _id: string,
    public nombre: string,
    public modelo: string,
    public telefono: number,
    public precio: number,
    public description: string,
    public urgencia: string,
    public date?: string
  ) {}

  get getUid() {
    return this._id;
  }

  public set state(data: boolean) {
    this.estado = data;
  }
}
