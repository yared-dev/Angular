import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseUrl = environment.base_url;
@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'usuarios' | 'trabajos' | 'productos'): string {
    if (!img) {
      return `${baseUrl}/upload/${tipo}/no-imgen`;
    } else if (img?.includes('https')) {
      return img;
    } else if (img) {
      return `${baseUrl}/upload/${tipo}/${img}`;
    } else {
      return `${baseUrl}/upload/${tipo}/no-imgen`;
    }
  }
}
