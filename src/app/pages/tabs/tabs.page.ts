import { Component } from '@angular/core';
import { AuthService, MessengerService, PlayerService } from '../../services';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private messengerSrv: MessengerService,
    private authSrv: AuthService,
    private playerSrv: PlayerService
  ) {}
  
  tabChanged(event: { tab: string }) {
    this.playerSrv.setCurrentTab(event.tab);
  }


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
