import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateApplicationResponse, GetApplicationResponse } from '../models/api-responses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/application';

  applyForJob(jobId: String | null, formData: FormData): Observable<CreateApplicationResponse> {
    return this.http.post<CreateApplicationResponse>(`${this.apiUrl}/${jobId}`, formData);
  }

  getMyApplications(): Observable<GetApplicationResponse> {
    return this.http.get<GetApplicationResponse>(`${this.apiUrl}/my-applications`); 
  }
}
 