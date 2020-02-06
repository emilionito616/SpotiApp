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
      'Authorization': 'Bearer BQAq8IpzehMNsamzM9R7hhnZAUn7vjKtjJLTeJrYugPp_r2X8opN781vNJ6uDW40dz3jWWQFu7r_mvJAT2Y'
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
  
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
          .pipe( map (data => data['tracks']));
  }

  
}
