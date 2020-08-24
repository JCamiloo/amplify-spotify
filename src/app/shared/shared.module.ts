import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import * as fromComponents from './components';
import * as fromPipes from './pipes';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ],
  exports: [
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class SharedModule {}