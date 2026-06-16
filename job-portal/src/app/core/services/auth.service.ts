import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from '../models/auth.model';
import { LoginResponse, RegisterResponse } from '../models/api-responses';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth/';
  private http = inject(HttpClient);

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, credentials);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
