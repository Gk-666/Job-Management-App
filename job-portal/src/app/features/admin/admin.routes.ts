import { Routes } from '@angular/router';
import { Jobs } from './pages/jobs/jobs';
import { JobApplications } from './pages/job-applications/job-applications';
import { ApplicationDetails } from './pages/application-details/application-details';
import { Dashboard } from './pages/dashboard/dashboard';

export const adminRoutes: Routes = [
  {
    path: 'jobs',
    component: Jobs,
  },
  {
    path: 'jobs/:id/applications',
    component: JobApplications,
  },
  {
    path: 'jobs/applications/:id',
    component: ApplicationDetails,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
];
