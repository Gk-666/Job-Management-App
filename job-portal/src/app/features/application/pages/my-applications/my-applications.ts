import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Application } from '../../../../core/models/application.model';
import { ApplicationService } from '../../../../core/services/application.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selecApplicationsError, selectApplications, selectApplicationsLoading } from '../../store/applications.selector';
import { loadApplications } from '../../store/applications.actions';

@Component({
  selector: 'app-my-applications',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css',
})
export class MyApplications {
  private store = inject(Store);
  
  applications = this.store.selectSignal(selectApplications)

  loading = this.store.selectSignal(selectApplicationsLoading)

  error = this.store.selectSignal(selecApplicationsError)

  ngOnInit(): void {
    this.store.dispatch(loadApplications())
  }
}
