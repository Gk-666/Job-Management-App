import { Component, inject, signal, WritableSignal } from '@angular/core';
import { JobService } from '../../../../core/services/job.service';
import { AdminJob, Job } from '../../../../core/models/job.model';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-jobs',
  imports: [NgClass, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
  private jobService = inject(JobService);

  jobs: WritableSignal<AdminJob[]> = signal([]);

  isLoading = signal(false);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit() {
    this.loadJobs();
    this.listenSearch();
    this.isLoading.set(true);
  }

  listenSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => this.loadJobs(searchTerm));
  }

  loadJobs(searchTerm = '') {
    this.jobService.getAdminJobs(searchTerm).subscribe({
      next: (response) => {
        this.jobs.set(response.jobs);
        this.isLoading.set(false);
      },
    });
  }
}
