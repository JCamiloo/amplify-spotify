import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {

  @Output() swipe = new EventEmitter<number>();
  
  constructor() { }

  swipeToRegister() {
    this.swipe.emit(1);
  }
}
