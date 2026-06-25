import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardStats } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient)
  private apiUrl = "http://localhost:5000/api/dashboard/"

  getDashboardStats(){
    return this.http.get<DashboardStats>(`${this.apiUrl}`)
  }
}
