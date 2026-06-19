import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateApplicationResponse } from '../models/api-responses';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/application';
  
  applyForJob(jobId: String | null, formData: FormData) {
    return this.http.post<CreateApplicationResponse>(`${this.apiUrl}/${jobId}`, formData);
  }
}
