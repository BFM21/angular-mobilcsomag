import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  deleteUser(){
    this.auth.user.subscribe(user=>user?.delete());
  }

  updateUserCredentials(email: string, password:string){
    this.auth.user.subscribe(user=>{
      user?.updateEmail(email);
      user?.updatePassword(password);
    });
  }
}
