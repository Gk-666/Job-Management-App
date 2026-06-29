export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  employmentType: string;
  description: string;
  skillsRequired: string[];
  status: 'Open' | 'Close';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  applicationCount: number;
  createdAt: string;
}