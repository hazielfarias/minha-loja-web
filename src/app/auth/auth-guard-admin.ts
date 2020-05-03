import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // verifying if the user is logged
    if (this.loginService.isLoggedIn()) {
      return true;
    }

    // Navigate to the login page
    this.router.navigate(['/admin/login']);

    // the user isn't authorized to get in the app
    return false;
  }
}
