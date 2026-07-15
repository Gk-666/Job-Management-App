import { Job } from '../../../core/models/job.model';

export interface JobsState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
}

export const initialJobsState: JobsState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
};

