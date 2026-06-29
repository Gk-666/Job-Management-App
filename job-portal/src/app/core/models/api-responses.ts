import { Application } from './application.model';
import { AdminJob, Job } from './job.model';
import { User } from './user.model';

export interface PublishJobResponse {
  message: string;
  job: Job;
}

export interface GetJobsResopnse {
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

export interface GetApplicationResponse {
  message: string;
  applications: Application[];
}

export interface GetApplicationDetailsResponse {
  message: string;
  application: Application;
}

export interface updatedApplicationResponse {
  message: string;
  updatedApplication: Application;
}

export interface GetAdminJobResponse {
  message: string;
  jobs: AdminJob[];
}
