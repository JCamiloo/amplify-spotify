import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';

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
    private navCtrl: NavController,
    private messengerSrv: MessengerService
  ) { }

  ngOnInit() {
  }

  async onLogin(loginForm: FormGroup) {
    this.loginLoading = true;
    try {
      await this.authSrv.signIn(loginForm);
      this.loginLoading = false;
      this.navCtrl.navigateRoot('');
    } catch(e) {
      console.log('error', e)
      this.loginLoading = false;
      await this.messengerSrv.showMessage('Algo sucedió', e.code);
    }
  }

  async onSignUp(signUpForm: FormGroup) {
    // this.signUpLoading = true;
    this.authSrv.signUp(signUpForm);
    // const alert = await this.messengerSrv.showMessage('titulo', 'mensaje');
  }

  onSwipe(index: number) {
    this.mainSlide.slideTo(index);
  }
}
