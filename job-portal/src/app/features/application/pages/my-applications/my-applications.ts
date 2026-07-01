import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Application } from '../../../../core/models/application.model';
import { ApplicationService } from '../../../../core/services/application.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-applications',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css',
})
export class MyApplications {
  private applicationService = inject(ApplicationService);

  applications: WritableSignal<Application[]> = signal([]);

  isLoading = signal(false);

  errorMessage = '';

  ngOnInit(): void {
    console.log('loading.....');
    this.loadApplications();
  }

  loadApplications() {
    this.isLoading.set(true);

    this.applicationService.getMyApplications().subscribe({
      next: (response) => {
        console.log(response);
        this.applications.set(response.applications);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to load component.';
        this.isLoading.set(false);
      },
    });
  }
}
