import { Component, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { error } from 'console';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  currentUser?: firebase.default.User | null;
  myLocalStorage?: Storage | null;
 
   
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private authService: AuthService) {
    this.myLocalStorage = document.defaultView?.localStorage;
  }
   

  toggleSideNav(sidenav:MatSidenav){
    sidenav.toggle();
  }

  closeSideNav(sidenav:MatSidenav){
    sidenav.close();
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.currentUser = user;
      if(this.myLocalStorage){
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      }
    }, error => {
      localStorage.setItem('user', JSON.stringify('null'));
    });
    
  }
}
