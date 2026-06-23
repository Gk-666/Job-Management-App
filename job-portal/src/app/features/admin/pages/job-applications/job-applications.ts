import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ApplicationService } from '../../../../core/services/application.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Application } from '../../../../core/models/application.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-applications',
  imports: [CommonModule, RouterLink],
  templateUrl: './job-applications.html',
  styleUrl: './job-applications.css',
})
export class JobApplications {
  private applicationService = inject(ApplicationService);
  private route = inject(ActivatedRoute);

  applications: WritableSignal<Application[]> = signal([]);

  isLoading: WritableSignal<boolean> = signal(false);

  errorMessage = signal('');

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');

    if (!jobId) return;

    this.isLoading.set(true);
    this.loadApplications(jobId);
  }

  loadApplications(jobId: string | null) {
    this.applicationService.getApplicationsByJob(jobId).subscribe({
      next: (response) => {
        this.applications.set(response.applications);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage.set(error.error.message);
        this.isLoading.set(false);
      },
    });
  }
}
