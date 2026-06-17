import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';

@Component({
  selector: 'app-apply-job',
  imports: [ReactiveFormsModule],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.css',
})
export class ApplyJob {
  private fb = inject(FormBuilder);

  applicationForm = this.fb.nonNullable.group({
    personalInfo: this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      mobileNumber: this.fb.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      gender: this.fb.control('', Validators.required),
      currentLocation: this.fb.control('', [Validators.required, Validators.maxLength(15)]),
    }),
    professionalInfo: this.fb.group({
      qualification: this.fb.control('', Validators.required),
      experience: this.fb.control('', Validators.required),
      skills: this.fb.array([this.fb.control('', Validators.required)]),
      // resume : 
      coverLetter : this.fb.control('',Validators.required)
    }),
    preferences: this.fb.group({ 
      workMode: this.fb.control('', Validators.required),
      relocation: this.fb.control('', Validators.required),
    }),
  });

  get skills() {
    return this.applicationForm.get('professionalInfo')?.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    console.log('remove skill no : ', index);
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }
}
