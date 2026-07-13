import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobsState } from './jobs.state';

export const selectJobsState = createFeatureSelector<JobsState>('jobs');

export const selectJobs = createSelector(selectJobsState, (state) => state.jobs);

export const selectLoading = createSelector(selectJobsState, (state) => state.loading);

export const selectError = createSelector(selectJobsState, (state) => state.error);

export const selectSeletedJob = createSelector(selectJobsState, (state) => state.selectedJob);
