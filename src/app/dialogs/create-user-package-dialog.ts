import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'create-user-package-dialog',
  templateUrl: 'create-user-package-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule, NgIf],
})
export class CreateUserPackageDialog {

    userPackageForm = new FormGroup({
        name: new FormControl('',[Validators.maxLength(25),Validators.required]),
        description: new FormControl('',[Validators.maxLength(255)]),
      });

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
