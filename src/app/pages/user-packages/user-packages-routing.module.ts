import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPackagesComponent } from './user-packages.component';

const routes: Routes = [  {path: '', component: UserPackagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPackagesRoutingModule { }
