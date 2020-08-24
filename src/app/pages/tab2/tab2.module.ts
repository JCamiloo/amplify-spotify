import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { Tab2Page } from './page/tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
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
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
