import { Component } from '@angular/core';
import { AuthService, MessengerService } from 'src/app/services';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private messengerSrv: MessengerService,
    private authSrv: AuthService
  ) {}

  async signOut() {
    const alert = await this.messengerSrv.showMessage(
      'Cerrar sesión', 
      '¿Estás seguro de cerrar sesión?', 
      ['Cancelar', 'Aceptar']
    );

    await alert.present();
    
    const { data } = await alert.onDidDismiss();
    
    if (data.values) {
      this.authSrv.signOut();
    }
  }
}
