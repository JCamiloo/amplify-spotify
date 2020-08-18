import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signin() {
    Auth.signIn('jcamilo.osorio15@gmail.com', '12345678').then(console.log);
  }

  signup() {
    Auth.signUp('jcamilo.osorio15@gmail.com', '12345678').then(console.log);
    // Auth.confirmSignUp('jcamilo.osorio15@gmail.com', '254856').then(console.log);
    // Auth.signOut().then(console.log);
    
    // setTimeout(() => Auth.currentSession().then(console.log), 8000);
  }
}
