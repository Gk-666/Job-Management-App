import { createReducer, on } from '@ngrx/store';
import { initialApplicationsState } from './applications.state';
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

export const applicationReducer = createReducer(
  initialApplicationsState,

  on(loadApplications, (state) => ({ ...state, loading: true, error: null })),

  on(loadApplicationsSuccess, (state, { applications }) => ({ ...state, applications, loading: false, error: null })),

  on(loadApplicationsFailure, (state, { error }) => ({ ...state, error, loading: false })),


  on(createApplication, (state) => ({ ...state, loading: true, error: null })),

  on(createApplicationSuccess, (state) => ({ ...state, loading: false, error: null })),

  on(createApplicationFailure, (state, { error }) => ({ ...state, error, loading: false })),


  on(viewApplicationDetails, (state)=>({ ...state, loading:true, error:null })),

  on(viewApplicationDetailsSuccess, (state, { selectedApplication })=>({ ...state, selectedApplication, laoding:false, error:null })),

  on(viewApplicationDetailsFailure, (state, { error })=>({ ...state, error, loading:false })),


  on(loadJobApplications,(state)=>({ ...state, loading: true, error: null })),

  on(loadJobApplicationsSuccess,(state, { applications })=>({ ...state, applications, loading: false, error: null })),

  on(loadJobApplicationsFailure,(state, { error })=> ({ ...state, error, loading: false })),


  on(updateApplicationStatus, (state)=>({...state, loading: true, error: null})),

  on(updateApplicationStatusSuccess, (state, { updatedApplication })=>({ ...state, selectedApplication: updatedApplication, loading: false, error: null })),

  on(updateApplicationStatusFailure, (state, { error })=>({ ...state, error, loading: false }))
);
