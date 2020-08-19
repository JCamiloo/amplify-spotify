import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-album-songs',
  templateUrl: './album-songs.component.html',
  styleUrls: ['./album-songs.component.scss'],
})
export class AlbumSongsComponent implements OnInit {

  songs: any[] = [];
  title: any[] = [];

  constructor(
    private navParams: NavParams, 
    private modalCtlr: ModalController
  ) { }

  ngOnInit() {
    this.title = this.navParams.data.title;
    this.songs = this.navParams.data.songs;
  }

  async selectSong(song = null) {
    await this.modalCtlr.dismiss(song);
  }
}
