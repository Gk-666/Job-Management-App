import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Job } from '../../../../core/models/job.model';
import { JobService } from '../../../../core/services/job.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-job-list',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {
  private jobService = inject(JobService);
  isLoading = false;

  jobs: WritableSignal<Job[]> = signal([]);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit() {
    this.isLoading = true;
    this.loadJobList('');
    this.listenSearchControl();
  }

  listenSearchControl() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => this.loadJobList(searchTerm));
  }

  loadJobList(searchTerm: string) {
    this.jobService.getJobs(searchTerm).subscribe({
      next: (response) => {
        this.jobs.set(response.jobs);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
