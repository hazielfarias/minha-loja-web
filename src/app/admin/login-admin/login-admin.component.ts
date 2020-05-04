import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ForgotComponent } from 'src/app/forgot/forgot.component';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  public loginForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  public loader = false;

  constructor(private service: LoginService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.service.isLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit() {
    this.loader = true;
    this.service.loginAdmin(this.loginForm.value).subscribe(
      (res: Token) => {
        this.service.setTokens(res.accessToken, res.refreshToken);
        this.router.navigate(['/admin/dashboard']);
        this.loader = false;
      },
      err => {
        this.openSnackBar();
        this.loader = false;
      }
    );
  }

  goToForgot() {
    this.dialog.open(ForgotComponent, {
    });
  }

  openSnackBar() {

    this.snackBar.open('Usuário ou senha incorretos. Ou usuário não é um administrador', 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'snack-custom'
    });
  }

}
