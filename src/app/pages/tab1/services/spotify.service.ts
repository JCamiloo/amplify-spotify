import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  private token: string = '';

  constructor(private http: HttpClient) { }

  getToken() {
    return new Promise((resolve) => {
      this.http.get('https://spotify-get-token.herokuapp.com/spotify/a097f2b074f04b1fb725570498f439a3/cff7d005915640dfbbd9aaf02dae0523')
      .subscribe(data => {
        this.token = data['access_token']
        resolve();
      });
    });
  }

  getNewReleases() {
    return this.executeRequest('browse/new-releases?country=CO&limit=30').pipe(map(data => data['albums'].items));
  }

  getArtist(id: string) {
    return this.executeRequest(`artists/${id}`);
  }

  getArtistTopTracks(id: string) {
    return this.executeRequest(`artists/${id}/top-tracks?country=us`).pipe(map(data => data['tracks']));
  }

  getAlbumTracks(albumId: string) {
    return this.executeRequest(`albums/${albumId}/tracks?country=CO`);
  }

  private executeRequest(query: string) {
    const url = `${environment.API_URL}/${query}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    return this.http.get(url, { headers });
  }
}
