import { Job } from './job.model';
import { User } from './user.model';

export interface MyApplication {
  _id: string;
  applicant: string;
  job: Job;
  gender: string;
  mobileNumber: string;
  contactEmail: string;
  currentLocation: string;
  qualification: string;
  experience: string;
  skills: string[];
  workMode: string;
  relocation: boolean;
  coverLetter: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewApplication {
  _id: string;
  applicant: User;
  job: string;
  gender: string;
  mobileNumber: string;
  contactEmail: string;
  currentLocation: string;
  qualification: string;
  experience: string;
  skills: string[];
  workMode: string;
  relocation: boolean;
  coverLetter: string;
  createdAt: Date;
  updatedAt: Date;
}
