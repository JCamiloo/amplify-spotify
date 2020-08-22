import { Auth } from 'aws-amplify';
import { FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject(null);
  user$ = this.user.asObservable();

  constructor(private alertCtrl: AlertController) { }

  async signIn(loginForm: FormGroup) {
    const data = loginForm.getRawValue();
    try {
      const { attributes } = await Auth.signIn(data.email, data.password);
      this.setUser(attributes);
      await this.saveUser(attributes);
    } catch (e) {
      console.log('error', e);
      if (e.code === 'UserNotConfirmedException') {
        const alert = await this.submitCode();
        await alert.present();
        const { data } = await alert.onDidDismiss();
        console.log(data);          
      } else {
        throw e;
      }
    }
  }

  signUp(signUpForm: FormGroup) {
    const data = signUpForm.getRawValue();
    return new Promise((resolve, reject) => {
      Auth.signUp(data.email, data.password)
      .then((data) => {
        console.log(data);
        if (!data.userConfirmed) {
          
        }
      })
      .catch(e => reject(e));
    });
  }

  async submitCode() {
    const alert = await this.alertCtrl.create({
      cssClass: 'messenger',
      header: '¡Casi listo!',
      message: 'Revisa tu correo e ingresa el código de verificación',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Código'
        }
      ],
      buttons: [{
        text: 'Aceptar',
        handler: (alertData) => {
          return { values: alertData.code };
        }
      }]
    });

    return await alert;
  }

  setUser(value) {
    this.user.next(value);
  }

  saveUser(user) {
    return Storage.set({ key: 'user', value: JSON.stringify(user) });
  }

  async getUser() {
    let ret = await Storage.get({ key: 'user' });

    if (ret) {
      ret = JSON.parse(ret.value);
    } else {
      ret = null;
    }
    
    return ret;
  }
}
