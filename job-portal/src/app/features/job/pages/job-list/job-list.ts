import { Component, inject } from '@angular/core';
import { Job } from '../../../../core/models/job.model';
import { JobService } from '../../../../core/services/job.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {
  private jobService = inject(JobService);
  isLoading = false;

  jobs: Job[] = [];

  ngOnInit() {
    this.isLoading = true;
    this.loadJobList();
  }

  loadJobList() {
    this.jobService.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.jobs;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false
      },
    });
  }
}
