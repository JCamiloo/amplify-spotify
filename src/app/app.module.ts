import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AmplifyService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
