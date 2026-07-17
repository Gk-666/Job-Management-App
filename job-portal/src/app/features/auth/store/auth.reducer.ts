import { createReducer, on, State } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
} from './auth.action';

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({ ...state, loading: true, error: null })),

  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),

  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(logout, () => initialAuthState),

  on(register, (state) => ({ ...state, loading: true, error: null })),

  on(registerSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),

  on(registerFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
