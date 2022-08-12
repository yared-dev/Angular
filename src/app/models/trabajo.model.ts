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
    public id: string,
    public nombre: string,
    public modelo: string,
    public telefono: number,
    public precio: number,
    public description: string,
    public urgencia: string,
    public empleado: string,
    public iduser: number,
    public producto: string,
    public date?: string
  ) {}

  get getUid() {
    return this.id;
  }

  public set state(data: boolean) {
    this.estado = data;
  }
}
