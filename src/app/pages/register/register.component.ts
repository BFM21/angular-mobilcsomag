import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private router: Router, private authService: AuthService, private userService: UserService){}

 

  registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    password: new FormControl(),
    passwordAgain: new FormControl()
  });

  onSubmit(){
    if(this.registerForm.valid){
           this.authService.register(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then(cred => {
        const newUser: User = {
          id: cred.user?.uid as string,
          firstName: this.registerForm.get('firstName')?.value,
          lastName: this.registerForm.get('lastName')?.value,
          email: this.registerForm.get('email')?.value,
          phoneNumber: this.registerForm.get('phoneNumber')?.value
        };
        this.userService.create(newUser).then(_=>{

        }).catch(error => {
          console.error(error);
        });
      });
      this.router.navigateByUrl('/login');
    }
    
  }
}
