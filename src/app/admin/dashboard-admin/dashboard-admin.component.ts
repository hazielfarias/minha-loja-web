import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  public user: any;
  public loader = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.breakToken().name;
  }

  logout() {
    this.loader = true;
    this.loginService.logoutAdmin();
    this.loader = false;
  }

}
