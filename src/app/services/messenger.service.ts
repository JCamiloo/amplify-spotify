import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private alertCtrl: AlertController) { }

  async showMessage(header: string, content: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'messenger',
      backdropDismiss: false,
      header,
      message: this.getMessage(content),
      buttons: ['Aceptar']
    });

    return await alert.present();
  }

  private getMessage(content: string) {
    switch (content) {
      case 'NotAuthorizedException':
        return 'Usuario o contraseña incorrectos';
      case 'UserNotFoundException':
        return 'El usuario no existe';
      case 'UsernameExistsException':
        return 'El correo ya está en uso';
      case 'CodeMismatchException':
        return 'Código incorrecto. Revisa tu correo e inicia sesión'
      default:
        return content;
    }
  }
}
