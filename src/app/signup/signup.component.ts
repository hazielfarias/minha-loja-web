import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  public signupForm = new FormGroup({
    name: this.nameFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  public loader = false;

  constructor(private service: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  onSubmit() {
    this.loader = true;
    this.service.signup(this.signupForm.value).subscribe(
      res => {
        this.openSnackBar('Usuário cadastrado com sucesso.');
        this.router.navigate(['/login']);
        this.loader = false;
      },
      err => {
        this.loader = false;
        console.log(err);
        this.openSnackBar('Email já cadastrado.');
      }
    );
  }

  openSnackBar(message: string) {

    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'snack-custom'
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
