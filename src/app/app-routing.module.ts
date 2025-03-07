import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Default to Register page
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: '**', redirectTo: 'register' } // Redirect unknown routes to Register
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
