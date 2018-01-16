import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-grade-dialog',
  templateUrl: './add-grade-dialog.component.html',
  styleUrls: ['./add-grade-dialog.component.scss']
})
export class AddGradeDialogComponent implements OnInit {

  private gradeAddForm: FormGroup;
  private gradeData: any[];
  constructor(
    public dialogRef: MatDialogRef<AddGradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.gradeAddForm = this.formBuilder.group({
      term: [this.data.term, Validators.required],
      cycle: [this.data.cycle, Validators.required],
      academicYear: [this.data.academicYear, Validators.required],
      studentId: [this.data.studentId, Validators.required],
      instructorId: [this.data.instructorId, Validators.required],
      programCourseId: [this.data.programCourseId, Validators.required],
      myClassId: [this.data.myClassId, Validators.required],
      gradeData: this.formBuilder.array(this.data.assessments.map( d => {
        const grade = this.getGrade(d.id, this.data.studentId);
        return this.createItem(d.id, d.programSopiId, d.sopi, grade);
      }))
    });
  }

  createItem(assessmentId, programSopiId, sopi, grade): FormGroup {
    return this.formBuilder.group({
      assessmentId: [assessmentId, Validators.required],
      programSopiId: [programSopiId, Validators.required],
      sopi: [sopi],
      grade: [grade, Validators.required]
    });
  }

  getGrade(assessmentId, studentId) {
    const data = _.find(this.data.grades, (d) => {
      return (d.assessmentId == assessmentId && d.studentId == studentId);
    });
    if (!data) {
      return null;
    } else {
      return data.grade;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.gradeAddForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.gradeAddForm.value)}`);
    }
  }
}
