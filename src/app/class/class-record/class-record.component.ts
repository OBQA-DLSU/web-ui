import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { NgSwitch, NgIf, NgFor} from '@angular/common';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WEB_API_URL } from '../../config';
import { AddStudentDialogComponent } from '../../student';
import { AddGradeDialogComponent } from '../../grade';
import {
  StudentActionCreator,
  AssessmentActionCreator,
  GradeActionCreator
} from '../../store/action-creators';
import * as _ from 'lodash';

@Component({
  selector: 'app-class-record',
  templateUrl: './class-record.component.html',
  styleUrls: ['./class-record.component.scss']
})
export class ClassRecordComponent implements OnInit, OnDestroy {

  @select(s => s.myClasses.selectedClass) selectedClass;
  @select(s => s.students.students) students;
  @select(s => s.assessments.assessments) assessments;
  @select(s => s.students.spinner) studentSpinner;
  @select(s => s.grades.grades) grades;
  private selectedClassesSubscription: Subscription = null;
  private studentSubscription: Subscription = null;
  private assessmentSubscription: Subscription = null;
  private selectedClassSubscription: Subscription = null;
  private gradesDataSubscription: Subscription = null;
  private selectedClassData: any;
  private studentData: any[];
  private assessmentData: any[];
  private gradesData: any[];
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;

  constructor(
    public dialog: MatDialog,
    private studentActionCreator: StudentActionCreator,
    private assessmentActionCreator: AssessmentActionCreator,
    private gradeActionCreator: GradeActionCreator
  ) {
    this.assessmentSubscription = this.assessments
    .subscribe(
      assessments => this.assessmentData = assessments
    );
    this.selectedClassesSubscription = this.selectedClass
    .subscribe(
      selectedClass => this.selectedClassData = selectedClass
    );
    this.gradesDataSubscription = this.grades
    .subscribe(
      grades => this.gradesData = grades
    );
  }

  ngOnInit() {
    this.selectedClassesSubscription = this.selectedClass
    .subscribe(
      selectedClass => {
        this.studentActionCreator.GetMyClassStudent(selectedClass.id);
        this.assessmentActionCreator.GetAssessmentWithQueryObject('and', [
          { academicYear: selectedClass.academicYear },
          { programCourseId: selectedClass.programCourseId }
        ]);
        this.gradeActionCreator.GetMyClassGrade(selectedClass.id);
      }
    );
    this.studentSubscription = this.students
    .subscribe(
      students => this.studentData = students
    );
  }

  ngOnDestroy() {
    (this.selectedClassesSubscription) ? this.selectedClassesSubscription.unsubscribe() : null;
    (this.assessmentSubscription) ? this.assessmentSubscription.unsubscribe() : null;
    (this.selectedClassesSubscription) ? this.selectedClassesSubscription.unsubscribe() : null;
  }

  onEditClick(student) {
    const data = {
      term: this.selectedClassData.term,
      cycle: this.selectedClassData.cycle,
      academicYear: this.selectedClassData.academicYear,
      studentId: student.studentId,
      studentName: `${student.lname}, ${student.fname}`,
      studentNumber: student.idNumber,
      instructorId: this.selectedClassData.instructorId,
      programCourseId: this.selectedClassData.programCourseId,
      myClassId: this.selectedClassData.id,
      assessments: this.assessmentData,
      grades: this.gradesData
    };

    this.dialogRef = this.dialog.open(AddGradeDialogComponent, {
      width: '600px',
      data: { ...data }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      } else {
        const newData = JSON.parse(result);
        this.gradeActionCreator.UpdateMyClassGrade(newData.myClassId, newData);
      }
    });
  }

  showGrade (studentId, assessmentId) {
    const data = _.find(this.gradesData, (g) => {
      return (g.studentId === parseInt(studentId) && g.assessmentId === parseInt(assessmentId));
    });
    if (!data) {
      return 0;
    } else {
      return data.grade;
    }
  }

}
