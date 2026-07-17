import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user.model';
import { LoginRequest, RegisterRequest } from '../../../core/models/auth.model';

export const login = createAction('[Auth] Login', props<{ credentials:LoginRequest }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());


export const logout = createAction('[Auth] Logout');


export const register = createAction('[Auth] Register', props<{ user: RegisterRequest }>());

export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());
