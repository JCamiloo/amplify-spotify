import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', {static: true}) mainSlide: IonSlides;

  constructor(private authSrv: AuthService) { }

  ngOnInit() {
  }

  onLogin(loginForm: FormGroup) {
    console.log(loginForm);
  }

  onSignUp(signUpForm: FormGroup) {
    console.log(signUpForm);
  }

  onSwipe(index: number) {
    this.mainSlide.slideTo(index);
  }
}
