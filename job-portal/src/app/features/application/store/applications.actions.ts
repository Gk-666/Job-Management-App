import { createAction, props } from '@ngrx/store';
import { Application } from '../../../core/models/application.model';


export const loadApplications = createAction('[Applications] Load Application ');

export const loadApplicationsSuccess = createAction('[Applications] Load Application Success', props<{ applications: Application[] }>());

export const loadApplicationsFailure = createAction('[Applications] Load Application Failure', props<{ error: string }>());


export const createApplication = createAction('[Applications] create Application', props<{ jobId: string, application: FormData }>());

export const createApplicationSuccess = createAction('[Applications] Create Application Success');

export const createApplicationFailure = createAction('[Applications] Create Application Failure', props<{ error: string }>());


export const viewApplicationDetails = createAction('[Applications] View Application Details', props<{ jobId: string }>());

export const viewApplicationDetailsSuccess = createAction('[Applicatons] View Application Details Success', props<{ selectedApplication: Application }>());

export const viewApplicationDetailsFailure = createAction('[Applications] View Application Details Faiure', props<{ error: string }>());


export const loadJobApplications = createAction('[Applications] Load Job Applications', props<{ jobId: string }>())

export const loadJobApplicationsSuccess = createAction('[Applications] Load Job Applications Success', props<{ applications: Application[] }>())

export const loadJobApplicationsFailure = createAction('[Applications] Load Job Applications Failure', props<{ error: string }>())


export const updateApplicationStatus = createAction('[Applicatons] Update Appplication Status', props<{ applicationId: string, status: string}>())

export const updateApplicationStatusSuccess = createAction('[Appliatios] Update Application Status Success')

export const updateApplicationStatusFailure = createAction('[Applications] Update Applications Status Failure',props<{ error: string }>())