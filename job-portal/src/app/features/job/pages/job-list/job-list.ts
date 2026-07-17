import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Job } from '../../../../core/models/job.model';
import { JobService } from '../../../../core/services/job.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadJobs } from '../../store/jobs.actions';
import { selectJobs, selectJobsError, selectJobsLoading } from '../../store/jobs.selector';

@Component({
  selector: 'app-job-list',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {
  private store = inject(Store);

  private destroy = inject(DestroyRef);

  jobs = this.store.selectSignal(selectJobs);

  loading = this.store.selectSignal(selectJobsLoading);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit() {
    this.store.dispatch(loadJobs({ searchTerm: '' }));

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntilDestroyed(this.destroy))
      .subscribe((searchTerm) => this.store.dispatch(loadJobs({ searchTerm: searchTerm })));
  }
}
