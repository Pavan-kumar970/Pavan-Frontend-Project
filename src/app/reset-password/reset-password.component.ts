import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  number: string = '';
  otp: string = '';
  newPassword: string = '';
  message: string = '';
  showNotification: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // ✅ Get phone number from query params
    this.route.queryParams.subscribe(params => {
      this.number = params['number'] || '';
    });
  }

  resetPassword() {
    this.loading = true;
    this.authService.resetPassword({ number: this.number, otp: this.otp, newPassword: this.newPassword }).subscribe({
      next: (res) => {
        this.message = res.message;
        this.showNotification = true;

        setTimeout(() => {
          this.router.navigate(['/login']); // ✅ Redirect to login after reset
        }, 3000);
      },
      error: (err) => {
        this.message = err.message || "Failed to reset password.";
        this.showNotification = true;
        this.loading = false;
      }
    });
  }
}
