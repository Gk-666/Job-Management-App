import { inject, Injectable } from '@angular/core';
import { ApplicationService } from '../../../core/services/application.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createApplication,
  createApplicationFailure,
  createApplicationSuccess,
  loadApplications,
  loadApplicationsFailure,
  loadApplicationsSuccess,
  loadJobApplications,
  loadJobApplicationsFailure,
  loadJobApplicationsSuccess,
  updateApplicationStatus,
  updateApplicationStatusFailure,
  updateApplicationStatusSuccess,
  viewApplicationDetails,
  viewApplicationDetailsFailure,
  viewApplicationDetailsSuccess,
} from './applications.actions';
import { catchError, exhaustAll, exhaustMap, map, of, tap } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable()
export class ApplicationsEffects {
  private applicationService = inject(ApplicationService);

  private router = inject(Router);

  private actions$ = inject(Actions);

  private notification = inject(NotificationService);

  loadMyApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApplications),

      exhaustMap(() =>
        this.applicationService.getMyApplications().pipe(
          map((res) => loadApplicationsSuccess({ applications: res.applications })),
          catchError((err) => of(loadApplicationsFailure({ error: err.error.message }))),
        ),
      ),
    ),
  );

  createApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createApplication),

      exhaustMap((response) =>
        this.applicationService.applyForJob(response.jobId, response.application).pipe(
          tap(() => {
            this.notification.success('Application successful.');
            this.router.navigate(['/my-applications']);
          }),

          map(() => createApplicationSuccess()),

          catchError((err) => {
            this.notification.error(err.error.message, 'Application Failed');
            return of(createApplicationFailure({ error: err.error.message }));
          }),
        ),
      ),
    ),
  );

  selectedAppliationDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(viewApplicationDetails),

      exhaustMap((response) =>
        this.applicationService.getApplicationDetails(response.jobId).pipe(
          map((res) => viewApplicationDetailsSuccess({ selectedApplication: res.application })),

          catchError((err) => {
            this.notification.error(err.error.message, 'Application load failed');
            return of(viewApplicationDetailsFailure({ error: err.error.message }));
          }),
        ),
      ),
    ),
  );

  loadJobApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJobApplications),

      exhaustMap((response) =>
        this.applicationService.getApplicationsByJob(response.jobId).pipe(
          map((res) => loadJobApplicationsSuccess({ applications: res.applications })),
          catchError((err) => {
            this.notification.error(err.error.message);
            return of(loadJobApplicationsFailure({ error: err.error.message }));
          }),
        ),
      ),
    ),
  );

  updateApplicationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateApplicationStatus),

      exhaustMap((response) =>
        this.applicationService
          .updateApplicationStatus(response.applicationId, response.status)
          .pipe(
            map((res) => updateApplicationStatusSuccess()),

            catchError((err) => {
              this.notification.error(err.error.message, 'Update status failed');
              return of(updateApplicationStatusFailure({ error: err.error.message }));
            }),
          ),
      ),
    ),
  );
}
