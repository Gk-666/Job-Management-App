import { Component, inject } from '@angular/core';
import { JobService } from '../../../../core/services/job.service';
import { Job } from '../../../../core/models/job.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {
  private jobService = inject(JobService);
  private route = inject(ActivatedRoute);

  job: Job | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.jobService.getJobById(id).subscribe({
      next: (response) => {
        this.job = response.job;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
