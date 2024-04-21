import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  submitted: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get('email')?.value!, this.loginForm.get('password')?.value!).then(cred => {
        //console.log(cred);
       
      }, (error) => {
        //console.log((error as FirebaseError).code);
        switch ((error as FirebaseError).code) {
          case 'auth/missing-email':
            this.snackBar.open('Kérlek add meg az email címed!', 'OK', {
              duration: 5000
            })
            break;

          case 'auth/missing-password':
            this.snackBar.open('Kérlek add meg jelszavad!', 'OK', {
              duration: 5000
            })
            break;
          case 'auth/invalid-credential':
            this.snackBar.open('Hibás email vagy jelszó!', 'OK', {
              duration: 5000
            })
            break;
          case 'auth/invalid-email':
            this.snackBar.open('Hibás email formátum!', 'OK', {
              duration: 5000
            })
            break;
          case 'auth/too-many-requests':
            this.snackBar.open('A fiókot zároltuk a több sikertelen belépési kísérlet miatt!', 'OK', {
              duration: 5000
            })
            break;
          default:
            this.snackBar.open('Hiba történt!', 'OK', {
              duration: 5000
            })
        }
      });
      this.router.navigateByUrl('/dashboard');
    }
  }

  showRequiredError(formName: string) {
    if (this.loginForm.get(formName)?.errors !== null) {
      if (this.loginForm.get(formName)!.errors!['required']) {
        return true;
      }
    }
    return false;
  }

  showEmailFormatError() {
    if (this.loginForm.get('email')?.errors !== null) {
      if (this.loginForm.get('email')!.errors!['email'] || this.loginForm.get('email')!.errors!['pattern']) {
        return true;
      }
    }
    return false;
  }
}
