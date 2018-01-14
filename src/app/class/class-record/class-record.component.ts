import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { NgSwitch, NgIf, NgFor} from '@angular/common';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { WEB_API_URL } from '../../config';
import { AddStudentDialogComponent } from '../../student';
import {
  StudentActionCreator,
  AssessmentActionCreator
} from '../../store/action-creators';

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
  private selectedClassesSubscription: Subscription = null;
  private studentSubscription: Subscription = null;
  private studentData: any[];

  constructor(
    private studentActionCreator: StudentActionCreator,
    private assessmentActionCreator: AssessmentActionCreator
  ) { }

  ngOnInit() {
    this.selectedClassesSubscription = this.selectedClass
    .subscribe(
      selectedClass => {
        this.studentActionCreator.GetMyClassStudent(selectedClass.id);
        this.assessmentActionCreator.GetAssessmentWithQueryObject('and', [
          { academicYear: selectedClass.academicYear },
          { programCourseId: selectedClass.programCourseId }
        ]);
      }
    );
    this.studentSubscription = this.students
    .subscribe(
      students => this.studentData = students
    );
  }

  ngOnDestroy() {
    (this.selectedClassesSubscription) ? this.selectedClassesSubscription.unsubscribe() : null;
  }

}
