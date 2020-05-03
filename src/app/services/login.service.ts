import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  SERVER_URL = 'https://minha-loja-api.herokuapp.com/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(data: User) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(data.email + ':' + data.password)}`
    });
    return this.http
      .post(`${this.SERVER_URL}/signin`, {}, { headers })
      .pipe(catchError(error => throwError(error)));
  }

  loginAdmin(data: User) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(data.email + ':' + data.password)}`
    });
    return this.http
      .post(`${this.SERVER_URL}/administrator`, {}, { headers })
      .pipe(catchError(error => throwError(error)));
  }

  signup(data: User) {
    return this.http
      .post(`${this.SERVER_URL}/signup`, data)
      .pipe(catchError(error => throwError(error)));
  }

  forgot(data: User) {
    return this.http
      .post(`${this.SERVER_URL}/forgot`, data)
      .pipe(catchError(error => throwError(error)));
  }

  recovery(data: User) {
    return this.http
      .post(`${this.SERVER_URL}/recovery`, data)
      .pipe(catchError(error => throwError(error)));
  }

  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return (
      accessToken !== null &&
      accessToken !== '' &&
      new Date() < this.getExpirationDate()
    );
  }

  getExpirationDate() {
    return new Date(this.breakToken().exp * 1000);
  }

  breakToken(): any {
    return jwtDecode(this.getAccessToken());
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshToken() {
    const requestBody = { refreshToken: this.getRefreshToken() };
    return this.http
      .post(`${this.SERVER_URL}/refresh`, requestBody)
      .pipe(catchError(error => throwError(error)));
  }

  logout() {
    this.removeTokens();
    this.router.navigate(['/login']);
  }

  logoutAdmin() {
    this.removeTokens();
    this.router.navigate(['/admin/login']);
  }

  removeTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
