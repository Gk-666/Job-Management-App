import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationForm } from '../../components/application-form/application-form';

@Component({
  selector: 'app-apply-job',
  imports: [ApplicationForm],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.css',
})
export class ApplyJob {}
