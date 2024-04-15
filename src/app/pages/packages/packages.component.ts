import { Component } from '@angular/core';
import { Package, PackageType } from '../../models/Package';
import { AuthService } from '../../services/auth.service';
import { PackagesService } from '../../services/packages.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

  standardPackages: Package[] = []
  internetPackages: Package[] = []
  callMessagePackages: Package[] = []
  
  constructor(private authService: AuthService, private packageService: PackagesService){}

   ngOnInit(){
    this.packageService.readAllStandard().subscribe(mobilePackages => {
      for(let mobilePackage in mobilePackages){
        this.standardPackages.push(mobilePackages[mobilePackage]);
      }
    });

    this.packageService.readAllInternet().subscribe(mobilePackages => {
      for(let mobilePackage in mobilePackages){
        this.internetPackages.push(mobilePackages[mobilePackage]);
      }
    });

    this.packageService.readAllCallMessage().subscribe(mobilePackages => {
      for(let mobilePackage in mobilePackages){
        this.callMessagePackages.push(mobilePackages[mobilePackage]);
      }
    });
  }
  
}
