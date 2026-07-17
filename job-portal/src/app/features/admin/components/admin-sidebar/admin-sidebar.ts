import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { logout } from '../../../auth/store/auth.action';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
 private store = inject(Store)

 logout(){
  this.store.dispatch(logout());
 }
}
