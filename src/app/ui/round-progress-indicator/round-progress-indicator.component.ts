import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-round-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round-progress-indicator.component.html',
  styleUrl: './round-progress-indicator.component.scss'
})
export class RoundProgressIndicatorComponent {
@Input('progressColor') progressColor: string = "blue";
}
