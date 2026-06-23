import { Component, inject, signal, WritableSignal } from '@angular/core';
import { JobService } from '../../../../core/services/job.service';
import { Job } from '../../../../core/models/job.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
  private jobService = inject(JobService);

  jobs!: WritableSignal<Job[] | []>;

  isLoading = signal(false);

  ngOnInit() {
    this.isLoading.set(true);
  }

  loadJobs() {
    this.jobService.getJobs().subscribe({
      next:(response)=>{
        this.jobs.set(response.jobs)
      }
    })
  }
}
