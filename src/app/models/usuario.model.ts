import { environment } from 'src/environments/environment';

const api_url = environment.base_url;
export class Usuario {
  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
    public img?: string,
    public role?: string,
    public id?: string
  ) {}

  get getImg() {
    if (!this.img) {
      return `${api_url}/upload/usuarios/no-imgen`;
    } else if (this.img?.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${api_url}/upload/usuarios/${this.img}`;
    } else {
      return `${api_url}/upload/usuarios/no-imgen`;
    }
  }

  get getName() {
    return this.name;
  }
  get getEmail() {
    return this.email;
  }
}
