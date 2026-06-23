import { Job } from './job.model';
import { User } from './user.model';

export interface Application {
  _id: string;
  applicant: User;
  job: Job;
  gender: string;
  mobileNumber: string;
  contactEmail: string;
  currentLocation: string;
  qualification: string;
  experience: string;
  skills: string[];
  workMode: 'remote' | 'on-site' | 'hybrid';
  relocation: boolean;
  resumeUrl : string;
  coverLetter: string;
  status: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}
