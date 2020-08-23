import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites = [];
  private username = '';

  constructor(private http: HttpClient) {
    this.getFavorites();
  }

  private async getFavorites() {
    const session = await Auth.currentSession();
    this.username = session.getAccessToken().payload.username;
    this.http.get(`${environment.AWS_URL}/${this.username}`).subscribe((favorites: any) => this.favorites = favorites);
  }

  private udapteFavorites() {
    const data = {
      username: this.username,
      favorites: this.favorites
    };
    this.http.post(`${environment.AWS_URL}`, JSON.stringify(data)).subscribe(console.log);
  }

  checkFavorite(id: string) {
    const index = this.favorites.find(song => song.id === id);

    if (index) {
      return true;
    } else {
      return false;
    }
  }

  addFavorite(song) {
    this.favorites.unshift(song);
    this.udapteFavorites();
  }

  removeFavorite(id: string) {
    const index = this.favorites.findIndex(song => song.id === id);

    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.udapteFavorites();
    }
  }

  get favoriteSongs() {
    return this.favorites;
  }
}
