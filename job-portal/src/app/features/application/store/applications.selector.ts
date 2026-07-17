import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationsState } from './applications.state';

export const selectApplicationState = createFeatureSelector<ApplicationsState>('application');

export const selectApplications = createSelector(
  selectApplicationState,
  (state) => state.applications,
);

export const selectApplicationsLoading = createSelector(
  selectApplicationState,
  (state) => state.loading,
);

export const selecApplicationsError = createSelector(
  selectApplicationState,
  (state) => state.error,
);

export const selectedApplication = createSelector(
  selectApplicationState,
  (state) => state.selectedApplication,
);
