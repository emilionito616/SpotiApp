import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBPgo-6nGtvw9sI9j51aLmfAvuF_VlC_12Nm9ki0I1jmpF117jfm-OS5NbFyKj5QzcPPVR43By20zl_qJM'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
          .pipe( map( data => data['albums'].items));
  }

  getArtista(termino:string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
          .pipe( map (data => data['artists'].items));
  }
}
