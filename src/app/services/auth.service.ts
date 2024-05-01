import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isUserLoggedIn() {
    return this.auth.user;
   
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  deleteUser() {
    this.auth.user.subscribe(user => user?.delete());
  }

  updateUserPassword(password: string) {
    this.auth.user.subscribe(user => {
     
      user?.updatePassword(password)

    });
  }
}
