import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  public loader = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public forgotForm = new FormGroup({
    email: this.emailFormControl
  });

  constructor(private service: LoginService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ForgotComponent>) { }

  onSubmit() {
    this.loader = true;
    this.service.forgot(this.forgotForm.value).subscribe(
      res => {
        this.openSnackBar('Email de recuperação enviado com sucesso.');
        this.loader = false;
      },
      err => {
        this.loader = false;
        console.log(err);
        this.openSnackBar('Email não cadastrado.');
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

}
