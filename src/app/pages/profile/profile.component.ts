import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DOCUMENT } from '@angular/common';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReauthenticateDialog } from '../../dialogs/reauthenticate-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from '@angular/fire/app';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  submitted: boolean = false;
  currentUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    currentPackageId: ''
  }

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl(),
    phoneNumber: new FormControl('', [Validators.pattern('^\\+36\\-([0-9]){2}\\-([0-9]){3}\\-([0-9]){4}$'), Validators.required]),
    password: new FormControl('', []),
    passwordAgain: new FormControl('', [])
  });

  myLocalStorage?: Storage | null;
  currentUserId: string;


  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private userService: UserService, private authService: AuthService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.profileForm.disable();
    this.myLocalStorage = document.defaultView?.localStorage;
    this.currentUserId = JSON.parse(localStorage.getItem('user') as string).uid;
  }

  ngOnInit(): void {

    this.authService.isUserLoggedIn().subscribe(user => {
    });

    this.userService.read(this.currentUserId).subscribe(user => {
      this.currentUser = user[0];
    });


    this.profileForm.get('password')?.valueChanges.subscribe(value => this.passwordChanged(value));

  }


  onEdit() {
    this.profileForm.get('firstName')?.setValue(this.currentUser.firstName);
    this.profileForm.get('lastName')?.setValue(this.currentUser.lastName);
    this.profileForm.get('phoneNumber')?.setValue(this.currentUser.phoneNumber);
    this.profileForm.enable();
    this.profileForm.get('email')?.disable();
  }

  passwordChanged(value: string | null) {
    const requiredValidator = Validators.required;
    const minLengthValidator = Validators.minLength(6);
    if ((value !== null && value !== "") && !this.profileForm.get('password')?.hasValidator(minLengthValidator) && !this.profileForm.get('passwordAgain')?.hasValidator(requiredValidator) && !this.profileForm.get('passwordAgain')?.hasValidator(minLengthValidator)) {

      this.profileForm.get("password")?.setValidators(minLengthValidator);
      this.profileForm.get("passwordAgain")?.setValidators([minLengthValidator, requiredValidator]);

    } else if (value === null || value === "") {
      this.profileForm.get("password")?.removeValidators(minLengthValidator);
      this.profileForm.get("passwordAgain")?.removeValidators([minLengthValidator, requiredValidator]);
      this.profileForm.get("passwordAgain")?.updateValueAndValidity();
    }
    this.profileForm.updateValueAndValidity();
  }


  onSave() {
    this.submitted = true;

    if (this.profileForm.valid) {
      const password = this.profileForm.get("password")?.value;
      const passwordAgain = this.profileForm.get("passwordAgain")?.value;
      if ((password !== '' && passwordAgain !== '' && password === passwordAgain)) {
        this.showReAuthDialog();
      } else if (password === '' && passwordAgain === '') {
        this.updateUserInfo();
      }
    }
  }

  onDelete() {
    this.userService.delete(this.currentUserId);
    this.authService.deleteUser();
    this.router.navigateByUrl('/login');
  }


  showRequiredError(formName: string) {
    if (this.profileForm.get(formName)?.errors !== null) {
      if (this.profileForm.get(formName)!.errors!['required']) {
        return true;
      }
    }
    return false;
  }

  showPhoneFormatError() {
    if (this.profileForm.get('phoneNumber')?.errors !== null) {
      if (this.profileForm.get('phoneNumber')!.errors!['pattern']) {
        return true;
      }
    }
    return false;
  }

  showPasswordShortError() {
    if (this.profileForm.get('password')?.errors !== null) {
      if (this.profileForm.get('password')!.errors!['minlength']) {
        return true;
      }
    }
    return false;
  }

  showPasswordsDontMatchError() {
    if (this.profileForm.get('password')?.value !== this.profileForm.get('passwordAgain')?.value) {
      let passwordErrors: ValidationErrors = this.profileForm.get('password')!.errors ?? {};
      passwordErrors['passwordsDontMatch'] = true;
      this.profileForm.get('password')?.setErrors(passwordErrors);
      let passwordAgainErrors: ValidationErrors = this.profileForm.get('passwordAgain')!.errors ?? {};
      passwordAgainErrors['passwordsDontMatch'] = true;
      this.profileForm.get('passwordAgain')?.setErrors(passwordAgainErrors);
      return true;
    }
    let passwordErrors: ValidationErrors = this.profileForm.get('password')!.errors ?? {};
    let updatedPasswordErrors: ValidationErrors = {};
    if (passwordErrors != null) {
      if (Object.keys(passwordErrors).length > 0) {
        Object.keys(passwordErrors).forEach(keyError => {
          if (keyError !== 'passwordsDontMatch') {
            updatedPasswordErrors![keyError] = passwordErrors[keyError];
          }
        });
        this.profileForm.get('password')?.setErrors(updatedPasswordErrors);
      } else {
        this.profileForm.get('password')?.setErrors(null);
      }
    }


    let passwordAgainErrors: ValidationErrors = this.profileForm.get('passwordAgain')!.errors ?? {};
    let updatedPasswordAgainErrors: ValidationErrors = {};
    if (passwordAgainErrors != null) {
      if (Object.keys(passwordAgainErrors).length > 0) {
        Object.keys(passwordAgainErrors).forEach(keyError => {
          if (keyError !== 'passwordsDontMatch') {
            updatedPasswordAgainErrors![keyError] = passwordAgainErrors[keyError];
          }
        });
        this.profileForm.get('passwordAgain')?.setErrors(updatedPasswordAgainErrors);
      } else {
        this.profileForm.get('passwordAgain')?.setErrors(null);
      }
    }

    return false;
  }

  showReAuthDialog() {
    const dialogRef = this.dialog.open(ReauthenticateDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result != false) {
        this.authService.login(this.currentUser.email, result.password);
        this.authService.updateUserPassword(this.profileForm.get("password")?.value!);
       
        this.updateUserInfo();
        
      }
    });
  }

  updateUserInfo() {
    this.currentUser.firstName = this.profileForm.get('firstName')?.value ?? this.currentUser.firstName;
    this.currentUser.lastName = this.profileForm.get('lastName')?.value ?? this.currentUser.lastName;
    this.currentUser.phoneNumber = this.profileForm.get('phoneNumber')?.value ?? this.currentUser.phoneNumber;

    this.userService.update(this.currentUser).then(result => {
      this.snackBar.open('Adatok sikeresen frissítve!', 'OK', { duration: 5000 }).afterDismissed().subscribe(result => {
        this.authService.logout()
        this.router.navigateByUrl('/login');
      });
    }, (error) => { this.snackBar.open('Hiba történt az adatok firrsítésekor!', 'OK', { duration: 5000 }) });
  }

}
