import { environment } from 'src/environments/environment';

const api_url = environment.base_url;
export class Trabajo {
  constructor(
    public nombre: string,
    public modelo: string,
    public telefono: number,
    public description: string,
    public precio: number,
    public urgencia: string,
    public uid: string
  ) {}

  get getUid() {
    return this.uid;
  }
}
