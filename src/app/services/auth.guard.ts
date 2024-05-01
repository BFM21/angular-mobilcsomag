import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, of, take, tap } from 'rxjs';
import { Inject, Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(@Inject(DOCUMENT) private document: Document, private router:Router) {}

  canActivate():boolean{
    if (this.document.defaultView!.localStorage.getItem('user') == 'null') {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}

export const authGuard: CanActivateFn = (route, state) => {

  return inject(AuthGuard).canActivate();
};
