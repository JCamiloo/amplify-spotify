import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FavoritesService, PlayerService, AuthService } from '../../../services';
import { Song, User } from '../../../interfaces';
import { Subscription } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnChanges {

  user: User;
  currentSong: HTMLAudioElement;
  newTime = 0;
  subscriptions: Subscription[] = [];
  @Input() song: Partial<Song> = {
    id: '',
    preview_url: '',
    playing: false,
    name: '',
    favorite: false
  };

  constructor(
    private favoritesSrv: FavoritesService,
    private playerSrv: PlayerService,
    private authSrv: AuthService
  ) {
    this.subscriptions.push(
      this.authSrv.user$.subscribe((user) => this.user = user)
    );
   }

  ngOnInit() {
    this.initPlayerSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    const song: Partial<Song> = changes['song'].currentValue;
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
    this.subscriptions.push(
      this.playerSrv.tabChanged$.subscribe(() => {
        if (this.song && this.song.playing) {
          this.pauseSong();
        }
      })
    );
  }

  addFavorite(song) {
    if (song && song.id !== '') {
      this.song.favorite = true;
      this.favoritesSrv.addFavorite(this.user.sub, song);
    } else {
      Toast.show({ text: 'Debes seleccionar una canción', position: "center" });
    }
  }

  removeFavorite(id: string) {
    if (id !== '') {
      this.song.favorite = false;
      this.favoritesSrv.removeFavorite(this.user.sub, id);
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
        if (this.song.preview_url !== '') {
          this.currentSong.play();
          this.song.playing = true;
        } else {
          Toast.show({ text: 'Debes seleccionar una canción', position: "center"});
        }
    }
  }

  pauseSong() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
