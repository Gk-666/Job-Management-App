import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadJobs, loadJobsFailure, loadJobsSuccess } from './jobs.actions';
import { inject, Injectable } from '@angular/core';
import { JobService } from '../../../core/services/job.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class JobsEffects {
  private actions$ = inject(Actions);

  private jobService = inject(JobService);

  loadPublicJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJobs),

      exhaustMap(() =>
        this.jobService.getJobs('').pipe(
          map((res) => loadJobsSuccess({ jobs: res.jobs })),

          catchError((res) => of(loadJobsFailure({ error: res.error.message }))),
        ),
      ),
    ),
  );
}
