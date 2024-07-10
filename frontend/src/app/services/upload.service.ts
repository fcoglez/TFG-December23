import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  async uploadImage(image: File, type: 'user'|'exercises', id: string) {
    try {
      const url = `${base_url}/upload/${ type }/${ id }`;
      const formData = new FormData();
      formData.append('file', image);
      const resp = await fetch( url, {
          method: 'POST',
          body: formData
      });

      const data = await resp.json();

      if ( data ) {
          return image.name;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
