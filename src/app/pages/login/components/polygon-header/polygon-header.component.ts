import { Component } from '@angular/core';

@Component({
  selector: 'app-polygon-header',
  template: '<div class="header"></div>',
  styles: [`
    .header {
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
export class PolygonHeaderComponent {

  constructor() { }

}
