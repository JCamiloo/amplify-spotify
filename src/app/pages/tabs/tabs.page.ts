import { Component } from '@angular/core';
import { AuthService, MessengerService, PlayerService } from '../../services';
import { environment } from '../../../environments/environment';
const MESSAGES = environment.MESSAGES;

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
      MESSAGES.SIGN_OUT_TITLE, 
      MESSAGES.SIGN_OUT_MESSAGE, 
      [MESSAGES.CANCEL_BUTTON, MESSAGES.ACCEPT_BUTTON]
    );

    await alert.present();
    
    const { data } = await alert.onDidDismiss();
    
    if (data.values) {
      this.authSrv.signOut();
    }
  }
}
