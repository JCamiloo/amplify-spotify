import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash = true;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
    });
  }
}
