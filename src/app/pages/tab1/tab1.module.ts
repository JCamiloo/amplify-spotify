import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './page/tab1.page';
import { Routes, RouterModule } from '@angular/router';
import * as fromComponents from './components';
import * as fromPipes from './pipes';

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
    RouterModule.forChild(routes)
  ],
  declarations: [
    Tab1Page,
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class Tab1PageModule {}
