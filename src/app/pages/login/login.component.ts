import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService){}

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  

  login(){
      this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(cred=>{
        console.log(cred);
        this.router.navigateByUrl('/dashboard');
      });
  }
}
