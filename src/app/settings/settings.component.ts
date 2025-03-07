import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUserProfile(); // ✅ Load User Profile from AuthService
  }

  updateProfile() {
    alert('Profile updated successfully!'); // Placeholder action
  }
}
