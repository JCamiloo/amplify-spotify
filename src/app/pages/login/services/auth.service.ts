import { Auth } from 'aws-amplify';
import { FormGroup } from '@angular/forms';

export class AuthService {

  constructor() { }

  signIn(loginForm: FormGroup) {
    const data = loginForm.getRawValue();
    return new Promise((resolve, reject) => {
      Auth.signIn(data.email, data.password)
        .then(resolve)
        .catch(e => reject(e));
    });
  }

  signUp(signUpForm: FormGroup) {
    const data = signUpForm.getRawValue();
    return new Promise((resolve, reject) => {
      Auth.signUp(data.email, data.password)
      .then((data) => {
        if (!data.userConfirmed) {
          resolve();
        }
      })
      .catch(e => reject(e));
    });
  }
}
