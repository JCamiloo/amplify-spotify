import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { MessengerService } from '../messenger/messenger.service'
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { User } from '../../interfaces';
import { environment } from '../../../environments/environment';
const MESSAGES = environment.MESSAGES;
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();

  constructor(
    private alertCtrl: AlertController,
    private messengerSrv: MessengerService,
    private navCtrl: NavController
  ) { 
    this.loadUser();
  }

  async signIn(loginForm: FormGroup) {
    const data: { email: string, password: string } = loginForm.getRawValue();
    try {
      const { attributes } = await Auth.signIn(data.email, data.password);
      this.setUser(attributes);
      await this.saveUser(attributes);
      return true;
    } catch (e) {
      if (e.code === 'UserNotConfirmedException') {
        const status = await this.submitCode(data.email);
        this.validateCodeStatus(status);
        return false;
      } else {
        throw Error(e.code);
      }
    }
  }

  signOut() {
    Auth.signOut();
    Storage.clear();
    this.navCtrl.navigateRoot('/login');
  }

  async signUp(signUpForm: FormGroup) {
    const formData: { email: string, password: string } = signUpForm.getRawValue();
    try {
      const data = await Auth.signUp(formData.email, formData.password);
      if (!data.userConfirmed) {
        const status = await this.submitCode(formData.email);
        this.validateCodeStatus(status);
        return false;
      }
    } catch (e) {
      throw Error(e.code);
    }
  }

  async submitCode(username: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'messenger',
      header: MESSAGES.SUBMIT_CODE_TITLE,
      message: MESSAGES.SUBMIT_CODE_MESSAGE,
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: MESSAGES.SUBMIT_CODE_PLACEHOLDER
        }
      ],
      buttons: [{
        text: MESSAGES.ACCEPT_BUTTON,
        handler: (alertData) => {
          return { values: alertData.code };
        }
      }]
    });

    await alert.present();
    const { data } = await alert.onDidDismiss();
    
    try {
      await Auth.confirmSignUp(username, data.values);
      return true;
    } catch (e) {
      return false;
    }
  }

  validateCodeStatus(status: boolean) {
    if (status) {
      this.messengerSrv.showMessage(
        MESSAGES.CODE_CONFIRMED_TITLE,
        MESSAGES.CODE_CONFIRMED_MESSAGE
      );
    } else {
      this.messengerSrv.showMessage(
        MESSAGES.ERROR_MESSAGE_TITLE,
        MESSAGES.CODE_MISMATCH_MESSAGE
      );
    }
  }

  async checkToken() {
    const user = await this.getUser();
    
    if (user) {
      return true;
    } else {
      this.navCtrl.navigateRoot('login');
      return false;
    }
  }

  setUser(value) {
    this.user.next(value);
  }

  saveUser(user) {
    return Storage.set({ key: 'user', value: JSON.stringify(user) });
  }

  async getUser() {
    let user = await Storage.get({ key: 'user' });

    if (user) {
      user = JSON.parse(user.value);
    } else {
      user = null;
    }
    
    return user;
  }

  loadUser() {
    this.getUser().then((user) => {
      if (user) {
        this.setUser(user);
      }
    });
  }
}
