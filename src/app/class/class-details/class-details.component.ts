import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { NgSwitch, NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { WEB_API_URL } from '../../config';
import { AddStudentDialogComponent, UpdateStudentDialogComponent } from '../../student';
import {
  StudentActionCreator
} from '../../store/action-creators';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit, OnDestroy {

  @select(s => s.myClasses.selectedClass) selectedClass;
  @select(s => s.students.students) students;
  @select(s => s.myClasses.spinner) spinner;
  @select(s => s.students.spinner) studentSpinner;
  private selectedClassData: any;
  private studentData: any;
  private selectedClassSubscription: Subscription = null;
  private studentSubscription: Subscription = null;
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;
  private routeSubscription: Subscription = null;
  private uploadUrl: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private studentActionCreator: StudentActionCreator,
    private activatedRoute: ActivatedRoute
  ) {
    this.selectedClassSubscription = this.selectedClass
      .subscribe(
        selectedClass => {
          this.selectedClassData = selectedClass;
          this.uploadUrl = `${WEB_API_URL}/api/student/bulk/${selectedClass.programId}/${selectedClass.id}`;
        }
      );
    this.studentSubscription = this.students
      .subscribe(
        students => this.studentData = students
      );
  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params
    .subscribe(
      params => { 
        this.studentActionCreator.GetMyClassStudent(params.id);
      }
    );
  }

  onAddStudent(myClassId, programId) {
    this.dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '500px',
      data: { myClassId, programId }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      } else {
        const newData = JSON.parse(result);
        this.studentActionCreator.CreateMyClassStudent(newData.myClassId, newData);
      }
    });
  }

  onUpdateStudent(student) {
    this.dialogRef = this.dialog.open(UpdateStudentDialogComponent, {
      width: '500px',
      data: { ...student }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      } else {
        const newData = JSON.parse(result);
        this.studentActionCreator.UpdateMyClassStudent(newData, newData.id);
      }
    });
  }

  ngOnDestroy() {
    (this.selectedClassSubscription) ? this.selectedClassSubscription.unsubscribe() : null;
    (this.routeSubscription) ? this.routeSubscription.unsubscribe(): null;
  }

}
