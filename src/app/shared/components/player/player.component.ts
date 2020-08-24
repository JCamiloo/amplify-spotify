import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { PlayerSong } from '../../../models';
import { FavoritesService, PlayerService } from '../../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnChanges {

  currentSong: HTMLAudioElement;
  newTime = 0;

  @Input() song: PlayerSong = {
    id: '',
    preview_url: '',
    playing: false,
    name: '',
    favorite: false
  };

  playerSubscription: Subscription;


  constructor(
    private favoritesSrv: FavoritesService,
    private playerSrv: PlayerService
  ) { }

  ngOnInit() {
    this.initPlayerSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    const song: PlayerSong = changes['song'].currentValue;
    if (song && song.preview_url !== '' ) {
      this.playSong('new');
    } else {
      this.song = {
        id: '',
        preview_url: '',
        playing: false,
        name: '',
        favorite: false
      };
    }
  }

  initPlayerSubscription() {
    this.playerSubscription = this.playerSrv.tabChanged$.subscribe(() => {
      if (this.song && this.song.playing) {
        this.pauseSong();
      }
    });
  }

  addFavorite(song) {
    if (song.id !== '') {
      this.song.favorite = true;
      this.favoritesSrv.addFavorite(song);
    }
  }

  removeFavorite(id: string) {
    if (id !== '') {
      this.song.favorite = false;
      this.favoritesSrv.removeFavorite(id);
    }
  }

  playSong(action: string) {
    switch(action) {
      case 'new': 
        this.currentSong && this.currentSong.pause();
        this.currentSong = new Audio(this.song.preview_url);
        this.currentSong.play();
        this.currentSong.addEventListener('timeupdate', () => {
          this.newTime = ( 1 / this.currentSong.duration ) * this.currentSong.currentTime;

          if (this.newTime === 1) {
            this.pauseSong();
          }
        });
        this.song.playing = true;
        this.song.favorite = this.favoritesSrv.checkFavorite(this.song.id);
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

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }
}
