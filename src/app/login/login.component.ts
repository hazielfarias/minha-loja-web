import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Token } from '../models/token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ForgotComponent } from '../forgot/forgot.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.loader = true;
    this.service.login(this.loginForm.value).subscribe(
      (res: Token) => {
        this.service.setTokens(res.accessToken, res.refreshToken);
        this.router.navigate(['/dashboard']);
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

  goToRegister() {
    this.router.navigate(['/signup']);
  }

  openSnackBar() {

    this.snackBar.open('Usuário ou senha incorretos.', 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'snack-custom'
    });
  }

}
