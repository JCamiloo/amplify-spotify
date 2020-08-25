import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Song } from '../../../../interfaces';
import { environment } from '../../../../../environments/environment';
const { Toast } = Plugins;
const MESSAGES = environment.MESSAGES;

@Component({
  selector: 'app-album-songs',
  templateUrl: './album-songs.component.html',
  styleUrls: ['./album-songs.component.scss'],
})
export class AlbumSongsComponent implements OnInit {

  songs: Song[] = [];
  title: string;

  constructor(
    private navParams: NavParams, 
    private modalCtlr: ModalController
  ) { }

  ngOnInit() {
    this.title = this.navParams.data.title;
    this.songs = this.navParams.data.songs;
  }

  async selectSong(song = null) {
    if (song && song.preview_url) {
      await this.modalCtlr.dismiss(song);
    } else {
      await Toast.show({ text: MESSAGES.SONG_NOT_AVAILABLE, position: "center" });
    }
  }

  close() {
    this.modalCtlr.dismiss(null);
  }
}
