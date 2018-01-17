import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-update-student-dialog',
  templateUrl: './update-student-dialog.component.html',
  styleUrls: ['./update-student-dialog.component.scss']
})
export class UpdateStudentDialogComponent implements OnInit {

  private studentUpdateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }
  // idNumber, fname, lname, programId, email, isAdmin, myCLassId = params
  ngOnInit() {
    this.studentUpdateForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      idNumber: [this.data.idNumber, Validators.required],
      fname: [this.data.fname, Validators.required],
      lname: [this.data.lname, Validators.required],
      programId: [this.data.programId, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      myClassId: [this.data.myClassId, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.studentUpdateForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.studentUpdateForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }
}
