import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@NgModule({
  declarations: [PackagesComponent],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    NgFor
  ]
})
export class PackagesModule { }
