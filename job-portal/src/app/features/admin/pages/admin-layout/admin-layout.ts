import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbar } from '../../components/admin-navbar/admin-navbar';
import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminNavbar, AdminSidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  @Input() error!:string 
}
