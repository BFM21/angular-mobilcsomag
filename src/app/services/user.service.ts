import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'users';
  constructor(private afs: AngularFirestore) { }


  create(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }


  read(id:string){
    return this.afs.collection<User>('users', ref => ref.where('id', '==', id).limit(1)).valueChanges();
  }


  update(user: User){
    let userDoc = this.afs.doc<User>(this.collectionName + "/" + user.id);
    userDoc.update({firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber});
  }


  delete(id:string){
    let userDoc = this.afs.doc(this.collectionName + "/" + id);
    userDoc.delete();
  }

}
