import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ModalController } from '@ionic/angular';
import { AlbumSongsComponent } from '../components/album-songs/album-songs.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  songs = [];
  albums = [];
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


  constructor(
    private spotifySrv: SpotifyService,
    private modalCtlr: ModalController
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    await this.spotifySrv.getToken();
    this.spotifySrv.getNewReleases().subscribe(releases => {
      this.songs = releases.filter(e => e.album_type === 'single');
      this.albums = releases.filter(e => e.album_type === 'album');
      this.isLoading = false;
    });
  }

  showSongs(artist: any) {
    this.spotifySrv.getArtistTopTracks(artist.id).subscribe((songs: any) => {
      this.openDetailModal(artist.name + ' - Top Tracks', songs.tracks);
    });
  }

  showAlbumSongs(album: any) {
    this.spotifySrv.getAlbumTracks(album.id).subscribe((albumResp: any) => {
      this.openDetailModal(album.name, albumResp.items);
    });
  }

  async openDetailModal(title: string, songs: any[]) {
    const modal = await this.modalCtlr.create({
        component: AlbumSongsComponent,
        componentProps: { title, songs }
    });

    modal.onDidDismiss().then(song => {
      if (song.data) {
        this.song = song.data
        this.playSong('new');
      } else {
        this.song = {
          preview_url: '',
          playing: false,
          name: ''
        };
      }
    });
    return await modal.present();
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
