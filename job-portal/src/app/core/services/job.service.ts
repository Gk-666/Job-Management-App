import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GetAdminJobResponse,
  GetJobByIdResponse,
  GetJobsResopnse,
  PublishJobResponse,
} from '../models/api-responses';
import { CreateJobModel } from '../models/create-job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api/jobs';

  private http = inject(HttpClient);

  getJobs() {
    return this.http.get<GetJobsResopnse>(this.apiUrl);
  }

  getJobById(id: string) {
    return this.http.get<GetJobByIdResponse>(`${this.apiUrl}/${id}`);
  }

  publishNewJob(jobData: CreateJobModel) {
    return this.http.post<PublishJobResponse>(`${this.apiUrl}`, jobData);
  }

  getAdminJobs() {
    return this.http.get<GetAdminJobResponse>(`${this.apiUrl}/my-jobs`);
  }
}
