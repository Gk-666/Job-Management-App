import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ApplicationService } from '../../../../core/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../../../core/models/application.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-application-details',
  imports: [NgClass, FormsModule],
  templateUrl: './application-details.html',
  styleUrl: './application-details.css',
})
export class ApplicationDetails {
  private applicationService = inject(ApplicationService);
  private route = inject(ActivatedRoute);

  isLoading: WritableSignal<boolean> = signal(false);

  application: WritableSignal<Application | null> = signal(null);

  selectedStatus = signal('');

  isUpdating = signal(false);

  ngOnInit() {
    const applicationId = this.route.snapshot.paramMap.get('id');
    if (!applicationId) return;

    this.isLoading.set(true);
    this.loadApplicationDetails(applicationId);
  }

  loadApplicationDetails(applicationId: string) {
    this.applicationService.getApplicationDetails(applicationId).subscribe({
      next: (response) => {
        this.application.set(response.application);
        this.selectedStatus.set(response.application.status);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
      },
    });
  }

  updateStatus() {
    this.isUpdating.set(true);
    this.applicationService
      .updateApplicationStatus(this.application()?._id, this.selectedStatus())
      .subscribe({
        next: (response) => {
          console.log(response)
          this.selectedStatus.set(response.updatedApplication.status);
          this.isUpdating.set(false);
        },
        error: (err) => {
          console.error(err.error);
          this.isUpdating.set(false);
        },
      });
  }
}
