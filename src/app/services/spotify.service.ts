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
      'Authorization': 'Bearer BQBo_F9gUkOb2aH425ByFswCtJ9Ym1_vzuT_6WQj54L5qp1pcCyFjrWo726shccIedbfUaHCz4s0UH1JcQo'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
          .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino:string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
          .pipe( map (data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
          /* .pipe( map (data => data['artists'].items)); */
  }
}
