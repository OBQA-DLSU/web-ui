import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgIf } from '@angular/common';
import {
  ACADEMIC_YEAR,
  TERM,
  CYCLE
} from '../../config';


@Component({
  selector: 'app-update-class-dialog',
  templateUrl: './update-class-dialog.component.html'
})
export class UpdateClassDialogComponent implements OnInit, OnDestroy {

  private myClassEditForm: FormGroup;
  @select(s => s.courses.courses) courses;
  @select(s => s.instructors.instructors) instructors;
  @select(s => s.session) session; 
  private academicYear: any[] = ACADEMIC_YEAR;
  private cycle: any[] = CYCLE;
  private term: any[] = TERM;
  private isAdmin: boolean;
  constructor(
    public dialogRef: MatDialogRef<UpdateClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.session.subscribe(
      session => {
        this.isAdmin = session.isAdmin;
      }
    );
    this.myClassEditForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      term: [this.data.term, Validators.required],
      academicYear: [this.data.academicYear, Validators.required],
      cycle: [this.data.cycle, Validators.required],
      programCourseId: [this.data.programCourseId, Validators.required],
      instructorId: [this.data.instructorId, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form): void {
    if (this.myClassEditForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.myClassEditForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }
}
