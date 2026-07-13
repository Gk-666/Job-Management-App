import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.action';
import { selectError, selectLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);

  private store = inject(Store);

  loading = this.store.selectSignal(selectLoading)

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  
  onSubmit() {
    if (this.loginForm.invalid) return;
    
    this.store.dispatch(login(this.loginForm.getRawValue()));
  }
}
