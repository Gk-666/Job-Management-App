import { Component, inject, signal, WritableSignal } from '@angular/core';
import { JobService } from '../../../../core/services/job.service';
import { AdminJob, Job } from '../../../../core/models/job.model';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [NgClass, CommonModule, RouterLink],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
  private jobService = inject(JobService);

  jobs: WritableSignal<AdminJob[]> = signal([]);

  isLoading = signal(false);

  ngOnInit() {
    this.loadJobs();
    this.isLoading.set(true);
  }

  loadJobs() {
    this.jobService.getAdminJobs().subscribe({
      next: (response) => {
        console.log(response);
        this.jobs.set(response.jobs);
      },
    });
  }
}
