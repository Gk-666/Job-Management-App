import { Job } from './job.model';
import { User } from './user.model';

export interface GetJobResopnse {
  jobs: Job[];
}

export interface GetJobByIdResponse {
  job: Job;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
