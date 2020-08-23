import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
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
      const status = await this.authSrv.signIn(loginForm);
      loginForm.reset();
      this.loginLoading = false;
      status && this.navCtrl.navigateRoot('');
    } catch(e) {
      loginForm.reset();
      this.loginLoading = false;
      const error = e.message.replace('error ', '');
      await this.messengerSrv.showMessage('Algo sucedió', error);
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
      await this.messengerSrv.showMessage('Algo sucedió', error);
    }
  }

  onSwipe(index: number) {
    this.mainSlide.slideTo(index);
  }
}
