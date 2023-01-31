import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MessageService } from 'src/app/services-local/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroAuthService {
  userData$: Observable<firebase.default.User | null>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private messageService: MessageService,
  ) {
    this.userData$ = angularFireAuth.authState;
  }

  /** Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        const message = 'You are Successfully signed up!';
        console.log('You are Successfully signed up!', res);
        this.log(`firebase-authService: ${message}`);
      })
      .catch(error => {
        const message = 'Something is wrong';
        console.log('Something is wrong:', error.message);
      });
  }

  /** Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(`You're in !`, res);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut()
      .then(() => {
        this.log('Sign out ');
      })
      .catch(error => {
        const message = 'Something is wrong';
        console.log('Something is wrong:', error.message);
      });
  }

  private log(message: string) {
    this.messageService.add(`firebase-authService: ${message}`);
  }
}
