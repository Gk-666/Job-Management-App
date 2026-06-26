import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  logout() {
    this.isLoading = true;
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.isLoading = false;
    }, 1000);
  }
}
