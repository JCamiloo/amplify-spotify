import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  
  loginForm: FormGroup;
  @Input() isLoading: boolean;
  @Output() onLogin = new EventEmitter<FormGroup>();
  @Output() onSwipe = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      const formKeys = Object.keys(this.loginForm.controls);
      formKeys.forEach((formKey) => this.loginForm.controls[formKey].markAsTouched());
    } else {
      this.onLogin.emit(this.loginForm);
    }
  }

  swipeToRegister() {
    this.onSwipe.emit(1);
  }

  get emailField() {
    return this.loginForm.controls['email'];
  }

  get passwordField() {
    return this.loginForm.controls['password'];
  }
}
