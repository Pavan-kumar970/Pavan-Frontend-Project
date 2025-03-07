import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  number: string = ''; 
  password: string = '';
  confirmPassword: string = '';
  otp: string = ''; 
  isOtpSent: boolean = false;
  message: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  get passwordMismatch(): boolean {
    return this.password !== this.confirmPassword && this.confirmPassword.length > 0;
  }

  // ✅ Step 1: Send OTP
  sendOTP() {
    if (this.passwordMismatch) {
      this.message = "Passwords do not match!";
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      number: this.number
    };

    this.authService.sendOTP(userData).subscribe({
      next: () => {
        this.message = "OTP sent to your number. Please verify.";
        this.isOtpSent = true;
      },
      error: (err) => this.message = err.error.message || "Failed to send OTP."
    });
  }

  // ✅ Step 2: Verify OTP & Register User
  verifyOTP() {
    const otpData = { number: this.number, otp: this.otp };

    this.authService.verifyOTP(otpData).subscribe({
      next: () => {
        this.message = "OTP verified successfully! Registering user...";
        this.registerUser();
      },
      error: (err) => this.message = err.error.message || "OTP verification failed."
    });
  }

  // ✅ Step 3: Register User After OTP Verification
  registerUser() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      number: this.number
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.message = "User registered successfully! Redirecting to login...";
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => this.message = err.error.message || "User registration failed."
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
