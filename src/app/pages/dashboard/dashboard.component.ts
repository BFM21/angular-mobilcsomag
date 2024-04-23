import { Component, HostListener, Inject } from '@angular/core';
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
  public innerWidth: any;
  currentUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    currentPackageId: ''
  };
  currentPackage: any;
  callMessagePackage: Package | undefined;
  internetPackage: Package | undefined;
  counter: number = 0;

  columnCount: number = 2;
  
  @HostListener('window:resize', ['$event.target.innerWidth'])

  onResize(width: number) {
     
   if(width <= 800){
      this.columnCount = 1;
    }else{
      this.columnCount = 2;
    }
 }

  constructor(private authService: AuthService, private packageService: PackagesService, private userService: UserService, private afs: AngularFirestore, @Inject(DOCUMENT) private document: Document,) {
    this.myLocalStorage = document.defaultView?.localStorage;
    this.currentUserId = JSON.parse(localStorage.getItem('user') as string).uid;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 800){
      this.columnCount = 1;
    }else{
      this.columnCount = 2;
    }

    this.userService.read(this.currentUserId).pipe(take(1)).subscribe(user => {
      this.currentUser = user[0];
      this.packageService.readUserPackage(this.currentUser.currentPackageId).pipe(take(1)).subscribe(mobilePackage => {
        if (mobilePackage.length > 0) {
          this.currentPackage = mobilePackage[0];
          this.currentPackage.type = PackageType.USER_MADE;
          this.packageService.readCallMessagePackage(this.currentPackage.callMessagePackageId).pipe(take(1)).subscribe(subPackage => {
            if (subPackage.length > 0) {
              this.callMessagePackage = subPackage[0];
              console.log(this.callMessagePackage);
            }
        });
  
            this.packageService.readInternetPackage(this.currentPackage.internetPackageId).pipe(take(1)).subscribe(subPackage => {
              if (subPackage.length > 0) {
                this.internetPackage = subPackage[0];
                console.log(this.internetPackage);
              }
        });
        console.log(window.location);
        console.log(this.currentPackage);
      }

      });

      this.packageService.readStandardPackage(this.currentUser.currentPackageId).pipe(take(1)).subscribe(mobilePackage => {
        if (mobilePackage.length > 0) {
          this.currentPackage = mobilePackage[0];
          this.currentPackage.type = PackageType.STANDARD;

          console.log(window.location);
          console.log(this.currentPackage);
        }

      });


    });
  }

isCurrentPackageUserMade(){
  return this.currentPackage.type === PackageType.USER_MADE;
}
  
}
