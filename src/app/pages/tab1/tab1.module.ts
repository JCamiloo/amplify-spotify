import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'; 
import { Routes, RouterModule } from '@angular/router';

import { Tab1Page } from './page/tab1.page';
import * as fromComponents from './components';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    Tab1Page,
    ...fromComponents.components,
  ]
})
export class Tab1PageModule {}
