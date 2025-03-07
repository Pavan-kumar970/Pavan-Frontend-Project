import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  message: string = '';
  showNotification: boolean = false;
  loading: boolean = false;
  passwordFieldType: string = 'password'; // ✅ Default hidden password

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true; // ✅ Show loader when login starts
    this.authService.login({ name: this.name, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', this.name);

        this.message = `Welcome, ${this.name}! 🎉`;
        this.showNotification = true;

        setTimeout(() => {
          this.showNotification = false;
          this.loading = false; // ✅ Hide loader before navigation
          this.router.navigate(['/dashboard']);
        }, 3000);
      },
      error: (err) => {
        this.message = err.message || "Login failed.";
        this.showNotification = true;
        this.loading = false; // ✅ Hide loader on error
        setTimeout(() => this.showNotification = false, 3000);
      }
    });
  }

  // ✅ Toggle password visibility
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
