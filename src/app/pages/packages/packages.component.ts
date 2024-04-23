import { Component, HostListener } from '@angular/core';
import { Package, PackageType } from '../../models/Package';
import { AuthService } from '../../services/auth.service';
import { PackagesService } from '../../services/packages.service';
import { UserPackage } from '../../models/UserPackage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserPackageDialog } from '../../dialogs/create-user-package-dialog';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subject, take } from 'rxjs';
import {User} from '../../models/User' 
import { error } from 'console';





@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

  currentUser?: firebase.default.User | null;
  standardPackages: Package[] = []
  internetPackages: Package[] = []
  callMessagePackages: Package[] = []
  selectedInternetPackage?: Package | undefined;
  selectedCallMessagePackage?: Package | undefined;

  public innerWidth: any;
  columnCount: number = 3;
  
  @HostListener('window:resize', ['$event.target.innerWidth'])

  onResize(width: number) {
     if(960 < width && width < 1600){
      this.columnCount = 2;
    }
    else if(width <= 960){
      this.columnCount = 1;
    }else{
      this.columnCount = 3;
    }
 }
  constructor(private router: Router, private authService: AuthService, private packageService: PackagesService, private userService: UserService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  showCreateDialog() {
    const dialogRef = this.dialog.open(CreateUserPackageDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        this.createNewUserPackage(result.name, result.description);
      }
    });
  }

  createNewUserPackage(packageName: string, packageDescription: string) {
    if (this.currentUser?.uid) {
      const userPackage: UserPackage = {
        id: '',
        userId: this.currentUser?.uid ?? '',
        internetPackageId: this.selectedInternetPackage?.id ?? '',
        callMessagePackageId: this.selectedCallMessagePackage?.id ?? '',
        name: packageName,
        description: packageDescription ?? '',
        price: parseInt(this.selectedInternetPackage?.price ?? '') + parseInt(this.selectedCallMessagePackage?.price ?? '') + "",
        type: PackageType.USER_MADE
      }
      this.packageService.create(userPackage, this.selectedInternetPackage?.id!, this.selectedCallMessagePackage?.id!).then(() => {
        this.snackBar.open('Csomag sikeresen létrehozva!', 'OK', {
          duration: 2000
        }).afterDismissed().subscribe(result => {
          this.router.navigateByUrl('/user-packages');
        });

      }, () => this.snackBar.open('Hiba történt!', 'OK'));
    } else {
      this.snackBar.open('Nem vagy bejelentkezve!', 'Bejelentkezés', {
        duration: 2000
      }).afterDismissed().subscribe(result => {
        this.router.navigateByUrl('/login');
      });
    }
  }

  selectInternetPackage(packageId: string) {
    for (let i = 0; i < this.internetPackages.length; i++) {
      if (this.internetPackages[i].id === packageId) {
        this.selectedInternetPackage = this.internetPackages[i];
      }
    }
  }

  selectCallMessagePackage(packageId: string) {
    for (let i = 0; i < this.callMessagePackages.length; i++) {
      if (this.callMessagePackages[i].id === packageId) {
        this.selectedCallMessagePackage = this.callMessagePackages[i];
      }
    }

  }
  
  setCurrentPackage(packageId:string){
    //console.log(packageId);
    let editUser: any;
    this.userService.read(this.currentUser!.uid).pipe(take(1)).subscribe(user => {
      editUser = user[0];
      editUser.currentPackageId = packageId;
      this.userService.update(editUser).then( result => {
        this.snackBar.open('Jelenleg használt csomag sikeresen frissítve!', 'OK', {duration: 4500})
      }, error => {
        this.snackBar.open('Hiba történt a jelenlegi csomag frissítésekor!', 'OK', {duration: 4500})
      });
    });

    
  }

  ngOnInit() {
    // console.log('onInit');
    this.innerWidth = window.innerWidth;
    if(960 < innerWidth && innerWidth < 1500){
      this.columnCount = 2;
    }
    else if(innerWidth <= 960){
      this.columnCount = 1;
    }else{
      this.columnCount = 3;
    }

    this.standardPackages = [];
    this.internetPackages = [];
    this.callMessagePackages = [];

    this.authService.isUserLoggedIn().subscribe(user => {
      this.currentUser = user;
    });
    this.packageService.readAllStandard().subscribe(mobilePackages => {
      for (let mobilePackage in mobilePackages) {
        this.standardPackages.push(mobilePackages[mobilePackage]);
      }
    });

    this.packageService.readAllInternet().subscribe(mobilePackages => {
      for (let mobilePackage in mobilePackages) {
        this.internetPackages.push(mobilePackages[mobilePackage]);
      }
    });

    this.packageService.readAllCallMessage().subscribe(mobilePackages => {
      for (let mobilePackage in mobilePackages) {
        this.callMessagePackages.push(mobilePackages[mobilePackage]);
      }
    });

 
  }

}
