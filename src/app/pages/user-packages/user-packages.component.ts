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
    console.log(width);
    if(1600 < width && width < 2400){
      this.columnCount = 3;
    }
    else if(960 < width && width < 1600){
      this.columnCount = 2;
    }
    else if(width <= 960){
      this.columnCount = 1;
    }else{
      this.columnCount = 4;
    }
 }

  constructor(private router: Router, private authService: AuthService, private packageService: PackagesService, private userService: UserService, public dialog: MatDialog, public snackBar: MatSnackBar){}

  showEditDialog(packageId:string) {
    const dialogRef = this.dialog.open(EditUserPackageDialog,{data: {id: packageId}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
    this.userService.read(this.currentUser!.uid).subscribe(user => {
      let editUser = user[0];
      editUser.currentPackageId = packageId;
      this.userService.update(editUser);
    });
  }

  ngOnInit(){
    this.innerWidth = window.innerWidth;
    if(1600 < innerWidth && innerWidth < 2400){
      this.columnCount = 3;
    }
    else if(960 < innerWidth && innerWidth < 1600){
      this.columnCount = 2;
    }
    else if(innerWidth <= 960){
      this.columnCount = 1;
    }else{
      this.columnCount = 4;
    }
    this.authService.isUserLoggedIn().subscribe(user => {
      this.currentUser = user;
      this.packageService.readAllUserMade(this.currentUser?.uid!).subscribe(mobilePackages => {
        console.log(mobilePackages);
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
