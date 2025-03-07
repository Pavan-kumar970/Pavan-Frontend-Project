import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  number: string = '';
  message: string = '';
  showNotification: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  sendOTP() {
    this.loading = true;
    this.authService.forgotPassword({ number: this.number }).subscribe({
      next: (res) => {
        this.message = res.message;
        this.showNotification = true;
        this.loading = false;

        // ✅ Navigate to Reset Password Component with phone number
        setTimeout(() => {
          this.router.navigate(['/reset-password'], { queryParams: { number: this.number } });
        }, 2000);
      },
      error: (err) => {
        this.message = err.message || "Failed to send OTP.";
        this.showNotification = true;
        this.loading = false;
      }
    });
  }
}
