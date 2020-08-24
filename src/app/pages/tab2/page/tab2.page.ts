import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  favoriteSongs = [];
  currentSong: HTMLAudioElement;
  newTime;
  isLoading = false;

  song: {
    preview_url: string,
    playing: boolean,
    name: string
  } = {
    preview_url: '',
    playing: false,
    name: ''
  };

  constructor(private favoriteSrv: FavoritesService) {
    
  }

  ngOnInit() {
    this.favoriteSongs = this.favoriteSrv.favoriteSongs;
  }

  setSong(song) {
    this.song = song;
    this.playSong('new');
  }

  playSong(action: string) {
    switch(action) {
      case 'new': 
        this.currentSong && this.currentSong.pause();
        this.currentSong = new Audio(this.song.preview_url);
        this.currentSong.play();
        this.currentSong.addEventListener('timeupdate', () => {
          this.newTime = ( 1 / this.currentSong.duration ) * this.currentSong.currentTime;
        });
        this.song.playing = true;
        break;
      default:
        this.currentSong.play();
        this.song.playing = true;
    }
  }

  pauseSong() {
    this.currentSong.pause();
    this.song.playing = false;
  }

}
