import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { AddStudentDialogComponent } from './add-student/add-student-dialog.component';
import { UpdateStudentDialogComponent } from './update-student/update-student-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    AddStudentDialogComponent,
    UpdateStudentDialogComponent
  ],
  declarations: [
    AddStudentDialogComponent,
    UpdateStudentDialogComponent
  ]
})
export class StudentModule { }
