import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetJobByIdResponse, GetJobResopnse } from '../models/api-responses';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api/jobs';

  private http = inject(HttpClient);

  getJobs() {
    return this.http.get<GetJobResopnse>(this.apiUrl);
  }

  getJobById(id:string){
    return this.http.get<GetJobByIdResponse>(`${this.apiUrl}/${id}`);
  }
}
