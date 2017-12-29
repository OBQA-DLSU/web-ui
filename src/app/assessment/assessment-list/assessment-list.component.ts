import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import { AssessmentActionCreator } from '../../store/action-creators/assessment.actioncreator';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styles: []
})
export class AssessmentListComponent implements OnInit, OnDestroy {

  @select(s => s.assessments.assessments) assessments;
  @select(s => s.session.programId) programId;
  @select(s => s.session.isAdmin) isAdmin;

  private programIdSubscription: Subscription = null;

  constructor(
    private assessmentActionCreator: AssessmentActionCreator
  ) { }

  private dataNames = [
    'sopi',
    'course',
    'term',
    'academicYear',
    'cycle',
    'assessmentTask',
    'assessmentLevel',
    'target',
    'performance',
    'improvementPlan'
  ];
  private dataNameAlias = [
    'SOPI',
    'Course',
    'Term',
    'A.Y',
    'Cycle',
    'Task',
    'Level',
    'Target',
    'Performance',
    'Improvement Plan'
  ];

  ngOnInit() {
    this.programIdSubscription = this.programId.subscribe(
      programId => this.assessmentActionCreator.GetAssessment(programId),
      err => null
    );
  }

  ngOnDestroy() {
    (this.programIdSubscription) ? this.programIdSubscription.unsubscribe() : null;
  }

  onClickEdit (event) {
    console.log(event);
  }

}
