import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {

  @Output() swipe = new EventEmitter<number>()

  constructor() { }

  swipeToLogin() {
    this.swipe.emit(0);
  }

}
