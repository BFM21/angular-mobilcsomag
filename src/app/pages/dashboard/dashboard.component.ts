import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PackagesService } from '../../services/packages.service';
import { UserPackage } from '../../models/UserPackage';
import { PackageType } from '../../models/Package';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    currentPackageId: ''
  };
  currentPackage: UserPackage = {
    userId: '',
    id: '',
    name: '',
    description: '',
    price: '',
    type: PackageType.USER_MADE,
    internetPackage: '',
    callMessagePackage: ''
  }
  constructor(private authService: AuthService, private packageService: PackagesService, private userService: UserService){}

  ngOnInit(){
    this.authService.isUserLoggedIn().subscribe(firebaseUser => {
     
      this.userService.read(firebaseUser?.uid!).subscribe(user=>{
        this.currentUser = user[0];
        this.packageService.read(this.currentUser.currentPackageId).subscribe(mobilePackages => {
          console.log(mobilePackages);
          this.currentPackage = {
            userId: '',
            id: '',
            name: '',
            description: '',
            price: '',
            type: PackageType.USER_MADE,
            internetPackage: '',
    callMessagePackage: ''
          };
          this.currentPackage = mobilePackages[0];
          console.log(this.currentPackage);
        });
      });
      
    });
    
  }
}
