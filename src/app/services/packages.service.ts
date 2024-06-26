import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Package, PackageType } from '../models/Package';
import { UserPackage } from '../models/UserPackage';
import { DocumentReference, doc } from '@angular/fire/firestore';
import { user } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  standardPackageCollection = 'standard_packages';
  callMessagePackageCollection = 'call_message_packages';
  internetPackagesCollection = 'internet_packages';
  userMadePackageCollection = 'user_packages';
  constructor(private afs: AngularFirestore) { }


  create(userPackage: UserPackage, internetPackageId: string, callMessagePackageId: string) {
    let id = this.afs.createId();
    userPackage.id = id;
    return this.afs.collection<UserPackage>(this.userMadePackageCollection).doc(id).set(userPackage);
  }

  readAllStandard() {
    return this.afs.collection<Package>(this.standardPackageCollection, ref => ref.orderBy('price', 'asc').orderBy('name', 'desc')).valueChanges();
  }

  readAllUserMade(userId: string) {
    return this.afs.collection<UserPackage>(this.userMadePackageCollection, ref => ref.where('userId', '==', userId).orderBy('price', 'asc').orderBy('name', 'desc')).valueChanges();
  }

  readAllInternet() {
    return this.afs.collection<Package>(this.internetPackagesCollection, ref => ref.orderBy('price', 'asc').orderBy('name', 'desc')).valueChanges();
  }

  readAllCallMessage() {
    return this.afs.collection<Package>(this.callMessagePackageCollection, ref => ref.orderBy('price', 'asc').orderBy('name', 'desc')).valueChanges();
  }

  readInternetPackage(id: string) {
    return this.afs.collection<UserPackage>(this.internetPackagesCollection, ref => ref.where('id', '==', id).limit(1)).valueChanges();
  }

  readCallMessagePackage(id: string) {
    return this.afs.collection<UserPackage>(this.callMessagePackageCollection, ref => ref.where('id', '==', id).limit(1)).valueChanges();
  }

  readUserPackage(id: string) {
    return this.afs.collection<UserPackage>(this.userMadePackageCollection, ref => ref.where('id', '==', id).limit(1)).valueChanges();
  }

  readStandardPackage(id:string){
    return this.afs.collection<Package>(this.standardPackageCollection, ref => ref.where('id', '==', id).limit(1)).valueChanges();
  }

  
  update(mobilePackage: Package) {
    let packageDoc = this.afs.doc<Package>(this.userMadePackageCollection + "/" + mobilePackage.id);
    packageDoc.update({ name: mobilePackage.name, description: mobilePackage.description });
  }

  delete(id: string) {
    let packageDoc = this.afs.doc(this.userMadePackageCollection + "/" + id);
    packageDoc.delete();
  }

}
