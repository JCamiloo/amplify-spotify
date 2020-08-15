import { Component, Input } from '@angular/core';

type Headers = 'rounded' |'polygon'; 

@Component({
  selector: 'app-rounded-header',
  template: `<div [ngClass]="headerClass"></div>`,
  styles: [`
    .rounded-header {
      width: 100%;
      height: 25%;
      background-color: var(--ion-color-primary);
      border-radius: 0 0 20px 20px;
      position: absolute;
      top:0;
      right: 0;
      z-index: -1;
    },

    .polygon-header {
      width: 100%;
      height: 100%;
      background-color: var(--ion-color-primary);
      clip-path: polygon(100% 0, 34% 0, 100% 100%);
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
    }
  `],
})
export class RoundedHeaderComponent {
  
  @Input() header: Headers;
  headerClass = {
    'rounded-header': this.header === 'rounded',
    'polygon-header': this.header === 'polygon'
  }

  constructor() { }

}
