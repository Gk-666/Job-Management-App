export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skillsRequired: string[];
  status: 'Open' | 'Close';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
