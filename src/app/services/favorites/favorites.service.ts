import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Plugins } from '@capacitor/core';
import { Song } from '../../interfaces';
const { Toast } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: Song[] = [];

  constructor(private http: HttpClient) { }

  getFavorites(username: string) {
    return this.http.get<Song[]>(`${environment.AWS_URL}/${username}`);
  }

  private udapteFavorites(username: string) {
    const data = { username, favorites: this.favorites };
    return this.http.post(`${environment.AWS_URL}`, JSON.stringify(data));
  }

  checkFavorite(id: string) {
    const index = this.favorites.find(song => song.id === id);

    if (index) {
      return true;
    } else {
      return false;
    }
  }

  addFavorite(username: string, song: Song) {
    this.favorites.unshift(song);
    this.udapteFavorites(username).subscribe(() => {
      Toast.show({ 
        text: 'Canción agregada a favoritos', 
        position: "center" 
      });
    });
  }

  removeFavorite(username: string, id: string) {
    const index = this.favorites.findIndex(song => song.id === id);

    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.udapteFavorites(username).subscribe(() => {
        Toast.show({ 
          text: 'Canción eliminada de favoritos', 
          position: "center"
        });
      });
    }
  }

  set favoriteSongs(songs: Song[]) {
    this.favorites = songs;
  }

  get favoriteSongs() {
    return this.favorites;
  }
}
