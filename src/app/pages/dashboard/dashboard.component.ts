import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PackagesService } from '../../services/packages.service';
import { UserPackage } from '../../models/UserPackage';
import { Package, PackageType } from '../../models/Package';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { DocumentReference } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription, mergeMap, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  myLocalStorage?: Storage | null;
  currentUserId: string;
  subscriptions: Subscription[] = [];

  currentUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    currentPackageId: ''
  };
  currentPackage: any;
  counter: number = 0;

  constructor(private authService: AuthService, private packageService: PackagesService, private userService: UserService, private afs: AngularFirestore, @Inject(DOCUMENT) private document: Document,) {
    this.myLocalStorage = document.defaultView?.localStorage;
    this.currentUserId = JSON.parse(localStorage.getItem('user') as string).uid;
  }

  ngOnInit() {
    this.counter++;
    this.subscriptions.push(this.userService.read(this.currentUserId).subscribe(user => {
      this.currentUser = user[0];
      this.packageService.readUserPackage(this.currentUser.currentPackageId).pipe(take(1)).subscribe(mobilePackage => {
        if (mobilePackage.length > 0) {
          this.currentPackage = mobilePackage[0];
          console.log(window.location);
          console.log(this.currentPackage);
        }

      });

      this.packageService.readStandardPackage(this.currentUser.currentPackageId).pipe(take(1)).subscribe(mobilePackage => {
        if (mobilePackage.length > 0) {
          this.currentPackage = mobilePackage[0];
          console.log(window.location);
          console.log(this.currentPackage);
        }

      });


    })
  );
    console.log(this.counter);
  }

  ngOnDestroy(): void {
    console.log('onDestroy')
    for(let sub in this.subscriptions){
      this.subscriptions[sub].unsubscribe();
    }
  }
}
