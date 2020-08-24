import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services';
import { PlayerSong } from '../../../models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  favoriteSongs = [];
  isLoading = false;

  song: PlayerSong = {
    id: '',
    preview_url: '',
    playing: false,
    name: '',
    favorite: false
  };

  constructor(private favoritesSrv: FavoritesService) {
    
  }

  ngOnInit() {
    this.favoriteSongs = this.favoritesSrv.favoriteSongs;
  }

  setSong(song: PlayerSong) {
    this.song = song;
  }

}
