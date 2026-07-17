import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../core/services/auth.service';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
} from './auth.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable()
export class AuthEffects {
  private router = inject(Router);

  private actions$ = inject(Actions);

  private authService = inject(AuthService);

  private notification = inject(NotificationService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),

      exhaustMap((loginRequest) =>
        this.authService.login(loginRequest.credentials).pipe(
          tap((res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.notification.success('Welcome back.', 'Login Successful');
            this.router.navigate(['/home']);
          }),

          map((res) => loginSuccess({ user: res.user })),

          catchError((err) => {
            this.notification.error(
              err.status === 0 ? "Can't reach server. Try again later." : err.error.meassage,
              'Login Failed',
            );
            return of(loginFailure({ error: err.error.message }));
          }),
        ),
      ),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),

        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.notification.info('Good Bye!', 'Logout successful');
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),

      exhaustMap((registerRequest) =>
        this.authService.register(registerRequest.user).pipe(
          map((res) => registerSuccess({ user: res.user })),

          catchError((err) => {
            this.notification.error(
              err.status === 0 ? "Can't reach server. Try again later." : err.error.meassage,
              'Registration Failed.',
            );
            return of(registerFailure({ error: err.error.message }));
          }),
        ),
      ),
    ),
  );
}
