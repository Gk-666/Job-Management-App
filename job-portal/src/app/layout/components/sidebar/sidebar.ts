import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
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
