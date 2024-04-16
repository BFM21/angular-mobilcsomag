import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'create-user-package-dialog',
  templateUrl: 'create-user-package-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule],
})
export class CreateUserPackageDialog {

    userPackageForm = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
      });
}
