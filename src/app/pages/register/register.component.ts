import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { FirebaseError } from '@angular/fire/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private snackBar: MatSnackBar) { }

  submitted: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), Validators.email, Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern('^\\+36\\-([0-9]){2}\\-([0-9]){3}\\-([0-9]){4}$'), Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    passwordAgain: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  ngOnInit(): void {
    this.registerForm.setErrors(null);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.get('email')!.value!, this.registerForm.get('password')?.value!).then(cred => {
        const newUser: User = {
          id: cred.user?.uid as string,
          firstName: this.registerForm.get('firstName')?.value!,
          lastName: this.registerForm.get('lastName')?.value!,
          email: this.registerForm.get('email')?.value!,
          phoneNumber: this.registerForm.get('phoneNumber')?.value!,
          currentPackageId: '',
        };
        this.userService.create(newUser).then(_ => {
          this.router.navigateByUrl('/dashboard');
        }).catch(error => {
          console.error(error);
        });
      }, (error) => {
        switch ((error as FirebaseError).code) {
          case 'auth/email-already-in-use':
            this.snackBar.open('Ezzel az email címmel, már regisztrált valaki!', 'OK', {
              duration: 5000
            })
            break;

          default: this.snackBar.open('Hiba történt!', 'OK', {
            duration: 5000
          });
        }
      });
      
    }
  }



  showRequiredError(formName: string) {
    if (this.registerForm.get(formName)?.errors !== null) {
      if (this.registerForm.get(formName)!.errors!['required']) {
        return true;
      }
    }
    return false;
  }

  showPhoneFormatError() {
    if (this.registerForm.get('phoneNumber')?.errors !== null) {
      if (this.registerForm.get('phoneNumber')!.errors!['pattern']) {
        return true;
      }
    }
    return false;
  }

  showEmailFormatError() {
    if (this.registerForm.get('email')?.errors !== null) {
      if (this.registerForm.get('email')!.errors!['email'] || this.registerForm.get('email')!.errors!['pattern']) {
        return true;
      }
    }
    return false;
  }

  showPasswordShortError(formName: string) {
    if (this.registerForm.get(formName)?.errors !== null) {
      if (this.registerForm.get(formName)!.errors!['minlength']) {
        return true;
      }
    }
    return false;
  }

  showPasswordsDontMatchError() {
    if (this.registerForm.get('password')?.value !== this.registerForm.get('passwordAgain')?.value) {
      let passwordErrors: ValidationErrors = this.registerForm.get('password')!.errors ?? {};
      passwordErrors['passwordsDontMatch'] = true;
      this.registerForm.get('password')?.setErrors(passwordErrors);
      let passwordAgainErrors: ValidationErrors = this.registerForm.get('passwordAgain')!.errors ?? {};
      passwordAgainErrors['passwordsDontMatch'] = true;
      this.registerForm.get('passwordAgain')?.setErrors(passwordAgainErrors);
      return true;
    }

    let passwordErrors: ValidationErrors = this.registerForm.get('password')!.errors ?? {};
    let updatedPasswordErrors: ValidationErrors = {};
    if (passwordErrors != null) {
      if (Object.keys(passwordErrors).length > 0) {
        Object.keys(passwordErrors).forEach(keyError => {
          if (keyError !== 'passwordsDontMatch') {
            updatedPasswordErrors![keyError] = passwordErrors[keyError];
          }
        });
        this.registerForm.get('password')?.setErrors(updatedPasswordErrors);
      } else {
        this.registerForm.get('password')?.setErrors(null);
      }
    }


    let passwordAgainErrors: ValidationErrors = this.registerForm.get('passwordAgain')!.errors ?? {};
    let updatedPasswordAgainErrors: ValidationErrors = {};
    if (passwordAgainErrors != null) {
      if (Object.keys(passwordAgainErrors).length > 0) {
        Object.keys(passwordAgainErrors).forEach(keyError => {
          if (keyError !== 'passwordsDontMatch') {
            updatedPasswordAgainErrors![keyError] = passwordAgainErrors[keyError];
          }
        });
        this.registerForm.get('passwordAgain')?.setErrors(updatedPasswordAgainErrors);
      } else {
        this.registerForm.get('passwordAgain')?.setErrors(null);
      }
    }

    return false;
  }

}
