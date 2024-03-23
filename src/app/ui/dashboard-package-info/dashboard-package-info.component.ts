import { Component } from '@angular/core';
import { RoundProgressIndicatorComponent } from '../round-progress-indicator/round-progress-indicator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-package-info',
  standalone: true,
  imports: [RoundProgressIndicatorComponent, CommonModule],
  templateUrl: './dashboard-package-info.component.html',
  styleUrl: './dashboard-package-info.component.scss'
})
export class DashboardPackageInfoComponent {

}
