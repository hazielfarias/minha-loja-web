import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: any;
  public loader = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.breakToken().name;
  }

  logout() {
    this.loader = true;
    this.loginService.logout();
    this.loader = false;
  }

}
