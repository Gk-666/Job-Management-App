import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../../../core/services/job.service';
import { CreateJobModel } from '../../../../core/models/create-job.model';

@Component({
  selector: 'app-create-job',
  imports: [ReactiveFormsModule],
  templateUrl: './create-job.html',
  styleUrl: './create-job.css',
})
export class CreateJob {
  private fb = inject(FormBuilder);
  private jobService = inject(JobService);

  isLoading = false;

  jobForm = this.fb.nonNullable.group({
    jobInfo: this.fb.nonNullable.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      salary: ['', Validators.required],
      location: ['', Validators.required],
    }),
    requirements: this.fb.nonNullable.group({
      employmentType: ['', Validators.required],
      experience: ['', Validators.required],
      skillsRequired: this.fb.array([this.fb.nonNullable.control('', Validators.required)]),
    }),
    description: ['', Validators.required],
  });

  get skills() {
    return this.jobForm.get('requirements.skillsRequired') as FormArray;
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
    return;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
    return;
  }

  onSubmit() {
    this.isLoading = true;
    if (this.jobForm.invalid) return;

    const value = this.jobForm.getRawValue();

    const jobData: CreateJobModel = {
      title: value.jobInfo.title,
      company: value.jobInfo.company,
      location: value.jobInfo.location,
      salary: value.jobInfo.salary,
      employmentType: value.requirements.employmentType,
      experience: value.requirements.experience,
      skillsRequired: value.requirements.skillsRequired,
      description: value.description,
    };

    this.jobService.publishNewJob(jobData).subscribe({
      next: (res) => {
        console.log(res);
        this.jobForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        if (!err.err) console.error('Something went wrong!');
        this.isLoading = false;
      },
    });
  }
}
