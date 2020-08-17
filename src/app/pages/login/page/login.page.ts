import { Component, OnInit, ViewChild, APP_ID } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', {static: true}) mainSlide: IonSlides;

  constructor() { }

  signin() {
    Auth.signIn('jcamilo.osorio15@gmail.com', '12345678').then(console.log);
  }

  ngOnInit() {
  }

  onSwipe(index: number) {
    this.mainSlide.slideTo(index);
  }
}
