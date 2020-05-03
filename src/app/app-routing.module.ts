import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { AuthGuardAdmin } from './auth/auth-guard-admin';

const routes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recovery/:userId', component: RecoveryComponent },
  { path: 'admin/login', component: LoginAdminComponent },
  { path: 'admin/dashboard', canActivate: [AuthGuardAdmin], component: DashboardAdminComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
