import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  Sparkles, 
  FileText, 
  Download, 
  CheckCircle, 
  TrendingUp, 
  LucideAngularModule 
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-policy-recommendation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './policy-recommendation.component.html',
  styles: []
})
export class PolicyRecommendationComponent {
  private authService = inject(AuthService);

  // Icons
  readonly SparklesIcon = Sparkles;
  readonly FileTextIcon = FileText;
  readonly DownloadIcon = Download;
  readonly CheckCircleIcon = CheckCircle;
  readonly TrendingUpIcon = TrendingUp;

  generating = signal(false);
  generated = signal(false);
  employeeType = signal('');
  department = signal('');
  coverageNeeds = signal<string[]>([]);

  get userRole() {
    return this.authService.userRole();
  }

  coverageOptions = [
    'Health Insurance',
    'Travel Insurance',
    'Life Insurance',
    'Accident Coverage',
    'Dental & Vision',
    'Remote Work Equipment',
    'Professional Development',
    'Wellness Programs',
  ];

  recommendedPolicies = [
    {
      id: 1,
      name: 'Comprehensive Health Insurance',
      type: 'Health',
      coverage: '$100,000',
      premium: '$450/month',
      score: 95,
      features: [
        'In-patient hospitalization',
        'Out-patient treatment',
        'Maternity benefits',
        'Mental health coverage',
      ],
    },
    {
      id: 2,
      name: 'Corporate Travel Policy',
      type: 'Travel',
      coverage: '$50,000',
      premium: '$120/month',
      score: 88,
      features: [
        'International coverage',
        'Trip cancellation',
        'Lost baggage protection',
        'Emergency medical',
      ],
    },
    {
      id: 3,
      name: 'Equipment & Asset Protection',
      type: 'Asset',
      coverage: '$25,000',
      premium: '$80/month',
      score: 82,
      features: [
        'Laptop & mobile coverage',
        'Theft protection',
        'Accidental damage',
        'Replacement guarantee',
      ],
    },
  ];

  handleCoverageToggle(option: string) {
    this.coverageNeeds.update(needs => 
      needs.includes(option) ? needs.filter(n => n !== option) : [...needs, option]
    );
  }

  handleGenerate() {
    this.generating.set(true);
    setTimeout(() => {
      this.generating.set(false);
      this.generated.set(true);
    }, 2000);
  }
}
