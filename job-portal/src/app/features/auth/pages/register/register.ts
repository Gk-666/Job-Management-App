import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage = '';

  onSubmit() {
    if (this.registerForm.invalid){
      this.errorMessage = 'Please enter valid information.'
      return;
    } 

    if (
      this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value
    ) {
      this.errorMessage = 'Confirm password & password do not match !';
      return;
    }

    console.log(this.registerForm.getRawValue());
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: (response) => {
        console.log(response.message);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
