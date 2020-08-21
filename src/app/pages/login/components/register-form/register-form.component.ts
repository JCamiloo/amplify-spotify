import { Component, EventEmitter, Output, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  formSubscriptions: Subscription[] = [];
  @Input() isLoading: boolean;
  @Output() onSignUp = new EventEmitter<FormGroup>();
  @Output() onSwipe = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.initPasswordSubcriptions();
  }

  initPasswordSubcriptions() {
    this.signUpForm.controls['password'].valueChanges.subscribe((value: string) => {
      if (value.trim() !== this.passwordConfirmField.value) {
        this.passwordConfirmField.setErrors({ match: true });
      } else {
        this.passwordConfirmField.setErrors(null);
      }
    });

    this.signUpForm.controls['passwordConfirm'].valueChanges.subscribe((value: string) => {
      if (value.trim() !== this.passwordField.value) {
        this.passwordConfirmField.setErrors({ match: true });
      } else {
        this.passwordConfirmField.setErrors(null);
      }
    });
  }

  submit() {
    if (this.signUpForm.invalid) {
      const formKeys = Object.keys(this.signUpForm.controls);
      formKeys.forEach((formKey) => this.signUpForm.controls[formKey].markAsTouched());
    } else {
      this.onSignUp.emit(this.signUpForm);
    }
  }

  swipeToLogin() {
    this.onSwipe.emit(0);
  }

  get emailField() {
    return this.signUpForm.controls['email'];
  }

  get passwordField() {
    return this.signUpForm.controls['password'];
  }

  get passwordConfirmField() {
    return this.signUpForm.controls['passwordConfirm'];
  }

  ngOnDestroy() {
    this.formSubscriptions.forEach(formSubscription => formSubscription.unsubscribe());
  }
}
