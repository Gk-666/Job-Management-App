import { createReducer, on } from '@ngrx/store';
import { initialJobsState } from './jobs.state';
import { loadJobs, loadJobsFailure, loadJobsSuccess } from './jobs.actions';

export const jobReducer = createReducer(
  initialJobsState,

  on(loadJobs, (state) => ({ ...state, loading: true, error: null })),

  on(loadJobsSuccess, (state,{jobs}) => ({ ...state,jobs, loading: false, error: null })),

  on(loadJobsFailure, (state,{error}) => ({ ...state, loading: false, error })),
);
