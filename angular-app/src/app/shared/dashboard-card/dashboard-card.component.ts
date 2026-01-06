import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard-card.component.html',
  styles: []
})
export class DashboardCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input({ required: true }) icon!: any;
  @Input() trend?: string;
  @Input() trendUp?: boolean;
  @Input() bgColor: string = 'from-blue-600 to-purple-600';
}
