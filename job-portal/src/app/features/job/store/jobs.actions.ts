import { createAction, props } from '@ngrx/store';
import { Job } from '../../../core/models/job.model';

export const loadJobs = createAction('[Jobs] Load Jobs');

export const loadJobsSuccess = createAction('[Jobs] Load Job Success', props<{ jobs: Job[] }>());

export const loadJobsFailure = createAction('[Jobs] Load Job Failure', props<{ error: string }>());
