import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
const MESSAGES = environment.MESSAGES;

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private alertCtrl: AlertController) { }

  async showMessage(header: string, content: string, buttons?: string[]) {
    const alert = await this.alertCtrl.create({
      cssClass: 'messenger',
      backdropDismiss: false,
      header,
      message: this.getMessage(content),
      buttons: this.getAlertButtons(buttons)
    });

    return alert;
  }

  private getAlertButtons(buttons: string[]) {
    let alertButtons = [];

    if (!buttons) {
      return [{ 
        text: 'Aceptar', 
        handler: () => { 
          return { values: true };
        } 
      }];
    } else {
      alertButtons = buttons.map((nombreBoton, index) => {
        return ({ 
          text: nombreBoton, 
          handler: () => { 
            return { values: index === 0 ? false : true };
          } 
        });
      })
    }

    return alertButtons;
  }

  private getMessage(content: string) {
    switch (content) {
      case 'NotAuthorizedException':
        return MESSAGES.NOT_AUTHORIZED_EXCEPTION;
      case 'UserNotFoundException':
        return MESSAGES.USER_NOT_FOUND_EXCEPTION;
      case 'UsernameExistsException':
        return MESSAGES.USERNAME_EXISTS_EXCEPTION;
      case 'CodeMismatchException':
        return MESSAGES.CODE_MISMATCH_EXCEPTION;
      default:
        return content;
    }
  }
}
