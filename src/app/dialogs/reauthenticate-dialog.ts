import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PackagesService } from '../services/packages.service';
import { UserPackage } from '../models/UserPackage';
import { PackageType } from '../models/Package';

@Component({
  selector: 'reauthenticate-dialog',
  templateUrl: 'reauthenticate-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule],
})
export class ReauthenticateDialog {

    constructor( @Inject(MAT_DIALOG_DATA) public data: any,private packagesService: PackagesService){}

    passwordForm = new FormGroup({
        password: new FormControl(),
      });

      ngOnInit() {
       
      }
}
