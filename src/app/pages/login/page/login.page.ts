import { Component, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AuthService, MessengerService } from '../../../services';
import { environment } from '../../../../environments/environment';
const MESSAGES = environment.MESSAGES;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  @ViewChild('mainSlide', {static: true}) mainSlide: IonSlides;
  signUpLoading = false;
  loginLoading = false;

  constructor(
    private authSrv: AuthService,
    private navCtrl: NavController,
    private messengerSrv: MessengerService
  ) { }

  async onLogin(loginForm: FormGroup) {
    this.loginLoading = true;
    try {
      const status = await this.authSrv.signIn(loginForm);
      loginForm.reset();
      this.loginLoading = false;
      status && this.navCtrl.navigateRoot('');
    } catch(e) {
      loginForm.reset();
      this.loginLoading = false;
      const error = e.message.replace('error ', '');
      const alert = await this.messengerSrv.showMessage(MESSAGES.ERROR_MESSAGE_TITLE, error);
      alert.present();
    }
  }

  async onSignUp(signUpForm: FormGroup) {
    this.signUpLoading = true;
    try {
      await this.authSrv.signUp(signUpForm);
      signUpForm.reset();
      this.signUpLoading = false;
      this.onSwipe(0);
    } catch(e) {
      this.signUpLoading = false;
      signUpForm.reset();
      const error = e.message.replace('error ', '');
      const alert = await this.messengerSrv.showMessage(MESSAGES.ERROR_MESSAGE_TITLE, error);
      alert.present();
    }
  }

  onSwipe(index: number) {
    this.mainSlide.slideTo(index);
  }
}
