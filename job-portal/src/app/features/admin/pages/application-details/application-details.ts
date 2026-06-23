import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ApplicationService } from '../../../../core/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../../../core/models/application.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-application-details',
  imports: [FormsModule, NgClass],
  templateUrl: './application-details.html',
  styleUrl: './application-details.css',
})
export class ApplicationDetails {
  private applicationService = inject(ApplicationService);
  private route = inject(ActivatedRoute);

  isLoading: WritableSignal<boolean> = signal(false);

  application: WritableSignal<Application | null> = signal(null);

  selectedStatus!:string

  ngOnInit() {
    const applicationId = this.route.snapshot.paramMap.get('id');
    this.isLoading.set(true);
    this.loadApplicationDetails(applicationId);
  }

  loadApplicationDetails(applicationId: string | null) {
    this.applicationService.getApplicationDetails(applicationId).subscribe({
      next: (response) => {
        this.application.set(response.application);
        this.isLoading.set(false

        )
      },
      error: (error)=>{
        console.log(error)
        this.isLoading.set(false)
      }
    });
  }

  updateStatus(){

  }
}
