import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', {static: true}) mainSlide: IonSlides;
  signUpLoading = false;
  loginLoading = false;

  constructor(
    private authSrv: AuthService, 
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onLogin(loginForm: FormGroup) {
    this.loginLoading = true;
    console.log(loginForm);
    this.navCtrl.navigateRoot('');
  }

  onSignUp(signUpForm: FormGroup) {
    this.signUpLoading = true;
    console.log(signUpForm);
  }

  onSwipe(index: number) {
    this.mainSlide.slideTo(index);
  }
}
