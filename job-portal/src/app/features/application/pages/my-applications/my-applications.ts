import { Component, inject, signal } from '@angular/core';
import { MyApplication } from '../../../../core/models/application.model';
import { ApplicationService } from '../../../../core/services/application.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-applications',
  imports: [CommonModule,RouterLink],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css',
})
export class MyApplications {
  private applicationService = inject(ApplicationService);
  applications:MyApplication[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.isLoading = true;

    this.applicationService.getMyApplications().subscribe({
      next: (response) => {
        this.applications = response.applications;
        console.log(response.applications);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to load component.';
        this.isLoading = false;
      },
    });
  }
}
