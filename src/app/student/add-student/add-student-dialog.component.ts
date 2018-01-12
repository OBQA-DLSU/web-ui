import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})

export class AddStudentDialogComponent implements OnInit {

  private studentAddForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }
  // idNumber, fname, lname, programId, email, isAdmin, myCLassId = params
  ngOnInit() {
    this.studentAddForm = this.formBuilder.group({
      idNumber: [null, Validators.required],
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      programId: [this.data.programId, Validators.required],
      email: [null, Validators.required],
      myClassId: [this.data.myClassId, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.studentAddForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.studentAddForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }

}
