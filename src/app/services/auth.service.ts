import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// ✅ Define a User Interface for Type Safety
interface AuthResponse {
  token: string;
  user: { name: string; email: string; phone?: string; address?: string; membership?: string };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private listapiUrl = 'http://localhost:5000/api/auth/users'; 
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated()); // Auth state tracking

  constructor(private http: HttpClient) {}

   // ✅ Step 1: Send OTP
  sendOTP(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Step 2: Verify OTP
  verifyOTP(data: { number: string; otp: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, data).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.listapiUrl);
  }

  // ✅ Register a new user
  register(user: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      tap((res) => this.storeUserData(res)),
      catchError(this.handleError)
    );
  }

  // ✅ Login user
  login(user: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((res) => this.storeUserData(res)),
      catchError(this.handleError)
    );
  }

  // ✅ Store user data in localStorage and notify subscribers
  private storeUserData(res: AuthResponse): void {
    if (res.token && res.user) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userName', res.user.name);
      localStorage.setItem('userEmail', res.user.email);
      localStorage.setItem('userPhone', res.user.phone || '');
      localStorage.setItem('userAddress', res.user.address || '');
      localStorage.setItem('userMembership', res.user.membership || 'Standard');

      this.authState.next(true); // Notify subscribers about login
    }
  }

  // ✅ Get User Profile
  getUserProfile(): any {
    return {
      name: localStorage.getItem('userName') || 'Guest',
      email: localStorage.getItem('userEmail') || '',
      phone: localStorage.getItem('userPhone') || 'Not provided',
      address: localStorage.getItem('userAddress') || 'Not provided',
      membership: localStorage.getItem('userMembership') || 'Standard'
    };
  }

  // ✅ Get user name
  getUserName(): string {
    return localStorage.getItem('userName') || 'Guest';
  }

  // ✅ Get user email
  getUserEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ Observable for authentication state
  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  // ✅ Logout user
  logout(): void {
    localStorage.clear(); // Clears all stored user data
    this.authState.next(false); // Notify subscribers about logout
  }

  // ✅ Error Handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error?.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }

deleteUser(userId: string): Observable<any> {
  return this.http.delete(`${this.listapiUrl}/${userId}`).pipe(
    catchError(this.handleError)
  );
}


forgotPassword(data: { number: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/forgot-password`, data).pipe(
    catchError(this.handleError)
  );
}

resetPassword(data: { number: string; otp: string; newPassword: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/reset-password`, data).pipe(
    catchError(this.handleError)
  );
}

  
}
