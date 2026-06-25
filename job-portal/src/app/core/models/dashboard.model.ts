export interface DashboardStats {
  totalApplications: number;
  totalJobs: number;

  applicationsByStatus: {
    _id: string;
    count: number;
  }[];

  totalJobsByStatus: {
    _id: string;
    count: number;
  }[];

  topSkills: {
    _id: string;
    count: number;
  }[];

  recentJobs: {
    title: string;
    company: string;
    status: string;
    createdAt: string;
  }[];
}
