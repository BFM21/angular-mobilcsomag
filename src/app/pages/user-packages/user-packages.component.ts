import { Component } from '@angular/core';
import { UserPackage } from '../../models/UserPackage';
import { AuthService } from '../../services/auth.service';
import { PackagesService } from '../../services/packages.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-packages',
  templateUrl: './user-packages.component.html',
  styleUrl: './user-packages.component.scss'
})
export class UserPackagesComponent {
  userPackages: UserPackage[] = []
  currentUser?: firebase.default.User | null;
  
  constructor(private authService: AuthService, private packageService: PackagesService, public dialog: MatDialog, public snackBar: MatSnackBar){}

  ngOnInit(){
    this.authService.isUserLoggedIn().subscribe(user => {
      this.currentUser = user;
      this.packageService.readAllUserMade(this.currentUser?.uid!).subscribe(mobilePackages => {
        console.log(mobilePackages);
        for(let mobilePackage in mobilePackages){
          
            this.userPackages.push(mobilePackages[mobilePackage]);
          
        }
      });
    });

    
  }

}
