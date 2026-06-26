import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  imports: [ReactiveFormsModule],
  templateUrl: './create-job.html',
  styleUrl: './create-job.css',
})
export class CreateJob {
  private fb = inject(FormBuilder);

  jobForm = this.fb.group({
    skills: this.fb.array(['', Validators.required]),
  });

  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
    return
  }

  addSkill() {
    this.skills.push(['', Validators.required]);
    return
  }

  onSubmit() {}
}
