import { inject, Injectable } from '@angular/core';
import { ApplicationService } from '../../../core/services/application.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadApplications, loadApplicationsSuccess } from './applications.actions';
import { exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ApplicationsEffects {
  private applicationService = inject(ApplicationService);

  private router = inject(Router);

  private actions$ = inject(Actions);

//   loadApplications$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadApplications),

//       exhaustMap(() =>
//         this.applicationService
//           .getMyApplications()
//           .pipe(map((res) => loadApplicationsSuccess({ applications: res.applications }))
//         catchError((err)=>of)),
//       ),
//     ),
//   );
}
