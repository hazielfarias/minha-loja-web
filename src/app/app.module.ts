import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { Interceptor } from './interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './utilities/loader/loader.component';
import { AlertComponent } from './utilities/alert/alert.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { UploadProductComponent } from './admin/upload-product/upload-product.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
    AlertComponent,
    SignupComponent,
    ForgotComponent,
    RecoveryComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    UploadProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
