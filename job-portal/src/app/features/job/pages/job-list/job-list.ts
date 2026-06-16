import { Component, inject } from '@angular/core';
import { Job } from '../../../../core/models/job.model';
import { JobService } from '../../../../core/services/job.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-job-list',
  imports: [RouterLink],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {
  private jobService = inject(JobService);
   
  jobs: Job[] = [];

  ngOnInit() {
    this.jobService.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.jobs;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
