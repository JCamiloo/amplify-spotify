import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlbumSongsComponent } from '../components/album-songs/album-songs.component';
import { FavoritesService, SpotifyService } from '../../../services';
import { PlayerSong } from '../../../models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  songs = [];
  albums = [];
  isLoading = false;
  song: PlayerSong = {
    id: '',
    preview_url: '',
    playing: false,
    name: '',
    favorite: false
  };

  constructor(
    private modalCtlr: ModalController,
    private spotifySrv: SpotifyService,
    private favoritesSrv: FavoritesService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.favoritesSrv.getFavorites();
    await this.loadData();
    this.isLoading = false;
  }

  async loadData() {
    await this.spotifySrv.fetchToken();
    this.spotifySrv.getNewReleases().subscribe(releases => {
      this.songs = releases.filter(e => e.album_type === 'single');
      this.albums = releases.filter(e => e.album_type === 'album');
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
      }
    });

    return await modal.present();
  }
}
