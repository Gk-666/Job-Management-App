import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { login, loginFailure, loginSuccess, logout } from './auth.action';

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({ ...state, loading: true, error: null })),

  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),

  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(logout, () => initialAuthState),
);
