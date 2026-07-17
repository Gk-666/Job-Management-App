import { createAction, props } from '@ngrx/store';
import { Job } from '../../../core/models/job.model';

export const loadJobs = createAction('[Jobs] Load Jobs', props<{ searchTerm: string }>());

export const loadJobsSuccess = createAction('[Jobs] Load Jobs Success', props<{ jobs: Job[] }>());

export const loadJobsFailure = createAction('[Jobs] Load Jobs Failure', props<{ error: string }>());


export const loadAdminJobs = createAction(
  '[Jobs] Load Admin Jobs',
  props<{ searchTerm: string }>(),
);

export const loadAdminJobsSucccess = createAction(
  '[Jobs] Load Admin Jobs Success',
  props<{ jobs: Job[] }>(),
);

export const loadAdminJobsFailure = createAction(
  '[Jobs] Load Admin Jobs Failure',
  props<{ error: string }>(),
);


export const createJob = createAction('[Jobs] Create Job', props<Job>());

export const createJobSuccess = createAction('[Jobs] Create Job Success');

export const createJobFailure = createAction(
  '[Jobs] Creat Job Failure',
  props<{ error: string }>(),
);
