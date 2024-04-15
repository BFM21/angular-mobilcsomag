import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Package, PackageType } from '../models/Package';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  standardPackageCollection = 'standard_packages';
  callMessagePackageCollection = 'call_message_packages';
  internetPackagesCollection = 'internet_packages';
  userMadePackageCollection = 'user_packages';
  constructor(private afs: AngularFirestore) { }


  create(mobilePackage: Package){
    return this.afs.collection<Package>(this.userMadePackageCollection).doc(mobilePackage.id).set(mobilePackage);
  }
 
  readAllStandard(){
    return this.afs.collection<Package>(this.standardPackageCollection, ref=>ref.orderBy('price', 'asc')).valueChanges();
  }

  readAllUserMade(){
    return this.afs.collection<Package>(this.userMadePackageCollection, ref=>ref.orderBy('price', 'asc')).valueChanges();
  }

  readAllInternet(){
    return this.afs.collection<Package>(this.internetPackagesCollection, ref=>ref.orderBy('price', 'asc')).valueChanges();
  }

  readAllCallMessage(){
    return this.afs.collection<Package>(this.callMessagePackageCollection, ref=>ref.orderBy('price', 'asc')).valueChanges();
  }

  read(id:string, type: PackageType){
    return this.afs.collection<Package>(this.userMadePackageCollection, ref => ref.where('id', '==', id).limit(1)).valueChanges();
  }


  update(mobilePackage: Package){
    let packageDoc = this.afs.doc<Package>(this.userMadePackageCollection + "/" + mobilePackage.id);
    packageDoc.update({});
  }


  delete(id:string){
    let packageDoc = this.afs.doc(this.userMadePackageCollection + "/" + id);
    packageDoc.delete();
  }

}
