import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserPackagesComponent } from './user-packages.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserPackagesRoutingModule } from '../user-packages/user-packages-routing.module';
import { MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    UserPackagesComponent
  ],
  imports: [
    CommonModule,
    UserPackagesRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    NgFor
  ]
})
export class UserPackagesModule { }
