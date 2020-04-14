import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  public loader = false;

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  idFormControl = new FormControl('', []);

  public recoveryForm = new FormGroup({
    id: this.idFormControl,
    password: this.passwordFormControl
  });

  constructor(
    private service: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.activatedRoute
      .snapshot
      .params
      .userId;
    this.idFormControl.setValue(userId);
  }

  onSubmit() {
    this.loader = true;
    this.service.recovery(this.recoveryForm.value).subscribe(
      res => {
        this.openSnackBar('Senha alterada com sucesso.');
        this.router.navigate(['/login']);
        this.loader = false;
      },
      err => {
        this.loader = false;
        console.log(err);
        this.openSnackBar('Senha não alterada.');
      }
    );
  }

  openSnackBar(message: string) {

    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'snack-custom'
    });
  }

}
