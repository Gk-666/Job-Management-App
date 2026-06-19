import { MyApplication } from './application.model';
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

export interface CreateApplicationResponse {
  message: string;
  application: string;
}

export interface GetApplicationRespose {
  message: string;
  applications: MyApplication;
}
