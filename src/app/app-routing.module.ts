import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {path : 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    ,canActivate:[authGuard]
  }, 
    {path : 'packages', loadChildren: () => import('./pages/packages/packages.module').then(m => m.PackagesModule)}, 
    {path : 'user-packages', loadChildren: () => import('./pages/packages/packages.module').then(m => m.PackagesModule),
      canActivate:[authGuard]
    }, 
    {path : 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)}, 
    {path : 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)}, 
    {path : 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
      canActivate:[authGuard]
    }, 
    {path : '', redirectTo:'/login', pathMatch: 'full'}, 
    {path : '**', loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
