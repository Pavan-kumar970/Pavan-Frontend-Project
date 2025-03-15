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

  isSendingOtp: boolean = false;  // Track OTP sending state
  showLoader: boolean = false;    // Show loader during OTP send request
  
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

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

    this.isSendingOtp = true;  // Disable button
    this.showLoader = true;    // Show loader

    const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        number: this.number
    };

    this.authService.sendOTP(userData).subscribe(
        (response) => {  // ✅ Corrected syntax
            this.message = "OTP sent to your number. Please verify.";
            this.isOtpSent = true;
            this.showLoader = false;  // Hide loader
            this.isSendingOtp = false; // Re-enable button
        },
        (error) => {  // ✅ Corrected syntax
            this.message = error.error.message || "Failed to send OTP.";
            this.isSendingOtp = false; // Enable button on failure
            this.showLoader = false;  // Hide loader
        }
    );
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

// Toggle visibility for the password field
togglePasswordVisibility() {
  this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
}

// Toggle visibility for the confirm password field
toggleConfirmPasswordVisibility() {
  this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
