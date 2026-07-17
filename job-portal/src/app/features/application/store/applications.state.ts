import { Application } from '../../../core/models/application.model';

export interface ApplicationsState {
  applications: Application[];
  loading: boolean;
  selectedApplication: Application | null;
  error: string | null;
} 

export const initialApplicationsState:ApplicationsState = {
  applications: [],
  loading: false,
  selectedApplication: null,
  error: null,
};

