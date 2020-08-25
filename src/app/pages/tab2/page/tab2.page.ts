import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services';
import { Song } from '../../../interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  favoriteSongs: Song[] = [];
  isLoading = false;

  song: Partial<Song> = {
    id: '',
    preview_url: '',
    playing: false,
    name: '',
    favorite: false
  };

  constructor(private favoritesSrv: FavoritesService) {}

  ngOnInit() {
    this.favoriteSongs = this.favoritesSrv.favoriteSongs;
  }

  setSong(song: Song) {
    this.song = song;
  }
}