import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment';
import { Plugins } from '@capacitor/core';
import { AlbumsResponse, AlbumDetail } from '../../interfaces';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  constructor(private http: HttpClient) { }

  fetchToken() {
    return new Promise((resolve) => {
      this.http.get(`${environment.SPOTIFY_TOKEN_URL}`).subscribe(async (data) => {
        await this.setToken(data['access_token']);
        resolve();
      });
    });
  }

  getNewReleases() {
    return this.http.get<AlbumsResponse>(`${environment.SPOTIFY_URL}/browse/new-releases?country=CO&limit=30`).pipe(map(data => data.albums.items));
  }

  getAlbumTracks(albumId: string) {
    return this.http.get<AlbumDetail>(`${environment.SPOTIFY_URL}/albums/${albumId}/tracks?country=CO`);
  }

  setToken(token: string) {
    return Storage.set({ key: 'spotify_token', value: token });
  }

  getToken() {
    return Storage.get({ key: 'spotify_token' });
  }
}
