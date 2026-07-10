import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../../../core/services/application.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-form',
  imports: [ReactiveFormsModule],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css',
})
export class ApplicationForm {
  private fb = inject(FormBuilder);
  private applicationService = inject(ApplicationService);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);

  applicationForm = this.fb.nonNullable.group({
    personalInfo: this.fb.nonNullable.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      currentLocation: ['', [Validators.required, Validators.maxLength(15)]],
    }),
    professionalInfo: this.fb.nonNullable.group({
      qualification: ['', Validators.required],
      experience: ['', Validators.required],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    }),
    preferences: this.fb.nonNullable.group({
      workMode: ['', Validators.required],
      relocation: this.fb.control(false),
    }),
    applicationDetails: this.fb.nonNullable.group({
      coverLetter: ['', [Validators.required, Validators.maxLength(150)]],
      terms: [false, Validators.required],
    }),
  });

  resumeFile: File | null = null;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.applicationForm.patchValue({
      personalInfo: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }

  get skills(): FormArray {
    return this.applicationForm.get('professionalInfo.skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
      return;
    }
  }

  onSelectedFile(inputResumeEvent: HTMLInputElement): void {
    if (inputResumeEvent.files) {
      this.resumeFile = inputResumeEvent.files[0];
    }
  }

  onSubmit(): void {
    this.isLoading.set(true);
    if (this.applicationForm.invalid) {
      alert('Invalid Form details.');
      this.applicationForm.markAllAsTouched();
      this.isLoading.set(false);
      return;
    }

    const formData = new FormData();
    const formValue = this.applicationForm.getRawValue();
    const jobId = this.route.snapshot.paramMap.get('id');

    if (!jobId) {
      console.error('Job ID not found');
      return;
    }

    formData.append('mobileNumber', formValue.personalInfo.mobileNumber);
    formData.append('gender', formValue.personalInfo.gender);
    formData.append('currentLocation', formValue.personalInfo.currentLocation);
    formData.append('qualification', formValue.professionalInfo.qualification);
    formData.append('experience', formValue.professionalInfo.experience);
    formData.append('skills', JSON.stringify(formValue.professionalInfo.skills));
    formData.append('relocation', String(formValue.preferences.relocation));
    formData.append('workMode', formValue.preferences.workMode);
    formData.append('coverLetter', formValue.applicationDetails.coverLetter);

    if (this.resumeFile) {
      formData.append('resume', this.resumeFile);
    } else {
      console.log('Resume field found empty.please upload your resume!');
    }

    this.applicationService.applyForJob(jobId, formData).subscribe({
      next: (response) => {
        console.log(response.message);
        this.applicationForm.reset();
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.isLoading.set(false);
      },
    });
  }
}
