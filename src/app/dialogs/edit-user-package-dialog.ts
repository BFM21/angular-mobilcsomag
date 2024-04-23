import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackagesService } from '../services/packages.service';
import { UserPackage } from '../models/UserPackage';
import { PackageType } from '../models/Package';
import { take } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'edit-user-package-dialog',
  templateUrl: 'edit-user-package-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule,NgIf],
})
export class EditUserPackageDialog {

    selectedPackage: UserPackage = {
      userId: '',
      internetPackageId: '',
      callMessagePackageId: '',
      id: '',
      name: '',
      description: '',
      price: '',
      type: PackageType.USER_MADE,
    };

    constructor( @Inject(MAT_DIALOG_DATA) public data: any,private packagesService: PackagesService){}

    userPackageForm = new FormGroup({
      name: new FormControl('',[Validators.maxLength(25),Validators.required]),
      description: new FormControl('',[Validators.maxLength(255)]),
      });

      ngOnInit() {
        this.packagesService.readUserPackage(this.data.id).pipe(take(1)).subscribe(userPackage =>{
          this.selectedPackage = userPackage[0];
          this.userPackageForm.get('name')?.setValue(this.selectedPackage.name);
          this.userPackageForm.get('description')?.setValue(this.selectedPackage.description);
        });
      }

      showRequiredError(formName: string) {
        if (this.userPackageForm.get(formName)?.errors !== null) {
          if (this.userPackageForm.get(formName)!.errors!['required']) {
            return true;
          }
        }
        return false;
      }

      showMaxLengthError(formName: string) {
        if (this.userPackageForm.get(formName)?.errors !== null) {
          if (this.userPackageForm.get(formName)!.errors!['maxlength']) {
            return true;
          }
        }
        return false;
      }
}
