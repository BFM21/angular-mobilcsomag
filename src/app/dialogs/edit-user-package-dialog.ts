import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PackagesService } from '../services/packages.service';
import { UserPackage } from '../models/UserPackage';
import { PackageType } from '../models/Package';

@Component({
  selector: 'edit-user-package-dialog',
  templateUrl: 'edit-user-package-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule],
})
export class EditUserPackageDialog {

    selectedPackage: UserPackage = {
      userId: '',
      internetPackage: '',
      callMessagePackage: '',
      id: '',
      name: '',
      description: '',
      price: '',
      type: PackageType.USER_MADE,
    };

    constructor( @Inject(MAT_DIALOG_DATA) public data: any,private packagesService: PackagesService){}

    userPackageForm = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
      });

      ngOnInit() {
        this.packagesService.read(this.data.id).subscribe(userPackage =>{
          this.selectedPackage = userPackage[0];
          console.log(this.selectedPackage);
        });
      }
}
