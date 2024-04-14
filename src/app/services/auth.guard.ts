import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  if(user){
    return true;
  }
  return false;
};
