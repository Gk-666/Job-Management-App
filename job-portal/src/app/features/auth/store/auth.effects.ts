import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../core/services/auth.service';
import { login, loginFailure, loginSuccess } from './auth.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private router = inject(Router);

  private actions$ = inject(Actions);

  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),

      exhaustMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          tap((res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/home']);
          }),

          map((res) => loginSuccess({ user: res.user })),

          catchError((error) => of(loginFailure({ error: error.error.message }))),
        ),
      ),
    ),
  );
}
