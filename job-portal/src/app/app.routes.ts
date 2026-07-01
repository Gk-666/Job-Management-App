import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { JobList } from './features/job/pages/job-list/job-list';
import { JobDetails } from './features/job/pages/job-details/job-details';
import { MyApplications } from './features/application/pages/my-applications/my-applications';
import { Register } from './features/auth/pages/register/register';
import { ApplyJob } from './features/application/pages/apply-job/apply-job';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { AdminLayout } from './features/admin/pages/admin-layout/admin-layout';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'home',
    component: Layout,
    children: [
      {path:'', redirectTo: 'jobs', pathMatch:'full'},
      { path: 'jobs', component: JobList },
      { path: 'jobs/:id', component: JobDetails },
      { path: 'jobs/:id/apply', component: ApplyJob },
      { path: 'my-applications', component: MyApplications },
    ],
  },
  { path: 'register', component: Register },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    component: AdminLayout,
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
];
