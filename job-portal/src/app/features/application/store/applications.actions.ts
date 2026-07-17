import { createAction, props } from '@ngrx/store';
import { Application } from '../../../core/models/application.model';

export const loadApplications = createAction('[Applications] Load Application ');

export const loadApplicationsSuccess = createAction('[Applications] Load Application Success', props<{ applications: Application[] }>());

export const loadApplicationsFailure = createAction('[Applications] Load Application Failure', props<{ error: string }>());


export const createApplication = createAction('[Applications] create Application', props<{ application: Application }>());

export const createApplicationSuccess = createAction('[Applications] Create Application Success');

export const createApplicationFailure = createAction('[Application] Create Application Failure', props<{ error: string }>());


export const viewApplicationDetails = createAction('[Applications] View Application Details');

export const viewApplicationDetailsSuccess = createAction('[Applicatons] View Application Details Success', props<{ selectedApplication: Application }>());

export const viewApplicationDetailsFailure = createAction('[Applications] View Application Details Faiure', props<{ error: string }>());
