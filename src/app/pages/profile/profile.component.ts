import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DOCUMENT } from '@angular/common';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  currentUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }

  profileForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    password: new FormControl(),
    passwordAgain: new FormControl(),
  });

  myLocalStorage?: Storage | null;
  currentUserId: string;
   

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private userService: UserService, private authService: AuthService) {
    this.profileForm.disable();
    this.myLocalStorage = document.defaultView?.localStorage;
    this.currentUserId = JSON.parse(localStorage.getItem('user') as string).uid;
  }

  ngOnInit(): void {
     
    this.userService.read(this.currentUserId).subscribe(user => {
      this.currentUser = user[0];
    });
    
  }
  
  onEdit() {
    this.profileForm.enable();
  }

  onSave() {
    
    this.profileForm.updateValueAndValidity();
    if(this.profileForm.valid){
      const password = this.profileForm.get("password")?.value;
      const passwordAgain = this.profileForm.get("passwordAgain")?.value;
      if( password && passwordAgain && password === passwordAgain){
          this.authService.updateUserCredentials(this.profileForm.get('email')?.value as string, password);
          
            this.currentUser.firstName = this.profileForm.get('firstName')?.value;
            this.currentUser.lastName = this.profileForm.get('lastName')?.value;
            this.currentUser.email = this.profileForm.get('email')?.value;
            this.currentUser.phoneNumber = this.profileForm.get('phoneNumber')?.value;
          
          this.userService.update(this.currentUser);
      }
    }else{
      console.log(this.profileForm.controls.firstName.invalid);
      console.log(this.profileForm.controls.lastName.invalid);
      console.log(this.profileForm.controls.email.invalid);
      console.log(this.profileForm.controls.phoneNumber.invalid);
      console.log(this.profileForm.controls.password.invalid);
      console.log(this.profileForm.controls.passwordAgain.invalid);
    }
  }

  onDelete() {
    this.userService.delete(this.currentUserId);
    this.authService.deleteUser();
    this.router.navigateByUrl('/login');
    }

  
}
