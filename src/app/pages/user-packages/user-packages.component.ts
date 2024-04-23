import { Component, HostListener } from '@angular/core';
import { UserPackage } from '../../models/UserPackage';
import { AuthService } from '../../services/auth.service';
import { PackagesService } from '../../services/packages.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserPackageDialog } from '../../dialogs/create-user-package-dialog';
import { EditUserPackageDialog } from '../../dialogs/edit-user-package-dialog';
import { UserService } from '../../services/user.service';
import { Subject, take } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-packages',
  templateUrl: './user-packages.component.html',
  styleUrl: './user-packages.component.scss'
})
export class UserPackagesComponent {
  userPackages: UserPackage[] = []
  currentUser?: firebase.default.User | null;
  public innerWidth: any;
  columnCount: number = 3;
  
  @HostListener('window:resize', ['$event.target.innerWidth'])

  onResize(width: number) {
    if(1700 < width && width < 2400){
      this.columnCount = 3;
    }
    else if(1180 < width && width < 1700){
      this.columnCount = 2;
    }
    else if(width <= 1180){
      this.columnCount = 1;
    }else{
      this.columnCount = 4;
    }
 }

  constructor(private router: Router, private authService: AuthService, private packageService: PackagesService, private userService: UserService, public dialog: MatDialog, public snackBar: MatSnackBar){}

  showEditDialog(packageId:string) {
    const dialogRef = this.dialog.open(EditUserPackageDialog,{data: {id: packageId}});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result != false) {
        this.editPackage(packageId, result.name, result.description);
      }
    });
  }

  editPackage(packageId:string, newPackageName:string, newPackageDescription:string){
    let editedPackage: UserPackage | undefined;
    for(let userPackage in this.userPackages){
      if(this.userPackages[userPackage].id === packageId){
        editedPackage = this.userPackages[userPackage];
        break;
      }      
    }
    if(editedPackage !== undefined){
      editedPackage.name = newPackageName;
      editedPackage.description = newPackageDescription;
      this.packageService.update(editedPackage);
    }
  }


  deletePackage(packageId:string){
    this.packageService.delete(packageId);
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

  ngOnInit(){
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);

    if(1700 < innerWidth && innerWidth < 2400){
      this.columnCount = 3;
    }
    else if(1180 < innerWidth && innerWidth < 1700){
      this.columnCount = 2;
    }
    else if(innerWidth <= 1180){
      this.columnCount = 1;
    }else{
      this.columnCount = 4;
    }
    this.authService.isUserLoggedIn().subscribe(user => {
      this.currentUser = user;
      this.packageService.readAllUserMade(this.currentUser?.uid!).subscribe(mobilePackages => {
        this.userPackages = [];
        for(let mobilePackage in mobilePackages){
            this.userPackages.push(mobilePackages[mobilePackage]);
        }
      });
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }

  
}
