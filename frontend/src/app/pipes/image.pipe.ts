import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})

export class ImagePipe implements PipeTransform {

    transform( img: string, type: 'exercises'|'user'): string {
        if ( !img ) {
            return `${ base_url }/upload/user/no-image`;
        }
        return `${ base_url }/upload/${ type }/${ img }`;
    }
}
