import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', {static: true}) mainSlide: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  onSwipe(index: number) {
    this.mainSlide.slideTo(index);
  }
}
