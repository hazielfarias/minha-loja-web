import { NgModule } from '@angular/core';

import {
    MatInputModule
} from '@angular/material/input';
import {
    MatFormFieldModule
} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';


const modules = [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
