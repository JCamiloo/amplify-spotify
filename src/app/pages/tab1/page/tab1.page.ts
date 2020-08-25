import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlbumSongsComponent } from '../components/album-songs/album-songs.component';
import { FavoritesService, SpotifyService, AuthService } from '../../../services';
import { Album, Song, User } from '../../../interfaces';
import { Auth } from 'aws-amplify';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  user: User = { email: '', email_verified: false, sub: '' };
  userSubscription: Subscription;
  albums: Album[] = [];
  isLoading = false;
  song: Partial<Song> = {
    id: '',
    preview_url: '',
    playing: false,
    name: '',
    favorite: false
  };

  constructor(
    private modalCtlr: ModalController,
    private spotifySrv: SpotifyService,
    private favoritesSrv: FavoritesService,
    private authSrv: AuthService
  ) {
    this.userSubscription = this.authSrv.user$.subscribe((user) => this.user = user);
  }

  async ngOnInit() {
    this.isLoading = true;
    this.loadFavoriteSongs();
    await this.loadData();
    this.isLoading = false;
  }

  loadFavoriteSongs() {
    this.favoritesSrv.getFavorites(this.user.sub).subscribe((favorites) => {
      this.favoritesSrv.favoriteSongs = favorites;
    });
  }

  async loadData() {
    await this.spotifySrv.fetchToken();
    this.spotifySrv.getNewReleases().subscribe(releases => this.albums = releases);
  }

  showAlbumSongs(album: Album) {
    this.spotifySrv.getAlbumTracks(album.id).subscribe((albumResp) => {
      this.openDetailModal(album.name, albumResp.items);
    });
  }

  async openDetailModal(title: string, songs: Song[]) {
    const modal = await this.modalCtlr.create({
      component: AlbumSongsComponent,
      componentProps: { title, songs }
    });

    modal.onDidDismiss().then((song: { data: Song }) => {
      if (song.data) {
        this.song = song.data
      }
    });

    return await modal.present();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
