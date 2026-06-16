import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { JobList } from './features/job/pages/job-list/job-list';
import { JobDetails } from './features/job/pages/job-details/job-details';
import { MyApplications } from './features/application/pages/my-applications/my-applications';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { Register } from './features/auth/pages/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'jobs', component: JobList },
  { path: 'jobs/:id', component: JobDetails },
  { path: 'applications', component: MyApplications },
  { path: 'dashboard', component: Dashboard },
];
