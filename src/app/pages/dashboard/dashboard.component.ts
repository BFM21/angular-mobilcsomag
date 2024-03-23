import { Component } from '@angular/core';
import { DashboardUserInfoComponent } from '../../ui/dashboard-user-info/dashboard-user-info.component';
import { DashboardPackageInfoComponent } from '../../ui/dashboard-package-info/dashboard-package-info.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardUserInfoComponent, DashboardPackageInfoComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
