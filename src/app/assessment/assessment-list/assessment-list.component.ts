import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import {
  AssessmentActionCreator,
  CourseActionCreator,
  MiscActionCreator,
  SopiActionCreator
} from '../../store/action-creators'
import { CYCLE, ACADEMIC_YEAR, TERM } from '../../config';
@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html'
})
export class AssessmentListComponent implements OnInit, OnDestroy {

  @select(s => s.assessments.assessments) assessments;
  @select(s => s.session.programId) programId;
  @select(s => s.session.isAdmin) isAdmin;
  @select(s => s.misc.spinner) spinner;
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;
  private programIdSubscription: Subscription = null;

  constructor(
    private assessmentActionCreator: AssessmentActionCreator,
    public dialog: MatDialog,
    private sopiActionCreator: SopiActionCreator,
    private courseActionCreator: CourseActionCreator,
    private miscActionCreator: MiscActionCreator,
    private router: Router
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
    this.miscActionCreator.UpdatePageTitle('Assessment List');
    this.programIdSubscription = this.programId.subscribe(
      programId => {
        this.assessmentActionCreator.GetAssessment(programId);
        this.courseActionCreator.GetCourse(programId);
        this.sopiActionCreator.GetSopi(programId);
      },
      err => null
    );
  }

  ngOnDestroy() {
    (this.dialogRefSubscription) ? this.dialogRefSubscription.unsubscribe() : null;
    (this.programIdSubscription) ? this.programIdSubscription.unsubscribe() : null;
  }

  onClickEdit (data) {
    this.dialogRef = this.dialog.open(EditAssessmentDialog, {
      width: '900px',
      data: { ...data }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      } else {
        const newData = JSON.parse(result);
        this.assessmentActionCreator.UpdateAssessment(newData.id, newData);
      }
    });
  }

  onClickMore (data) {
    this.router.navigate([`/assessment/discussion/${data.id}`]);
  }

  async onClickDelete(data) {
    let x = await swal({
      title: 'Are you sure?',
      text: `You are about to delete an assessment.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (data) {
      if (data.value) { return true; }
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          text: 'The assessment has not been deleted.',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        });
      }
    }).catch(swal.noop);
    if (x) {
      this.assessmentActionCreator.DeleteAssessment(data.id);
    }
  }

}

@Component({
  selector: 'dialog-assessment-form',
  templateUrl: './dialog-assessment-form.html',
})
export class EditAssessmentDialog implements OnInit, OnDestroy {

  private assessmentEditForm: FormGroup;
  @select(s => s.courses.courses) courses;
  @select(s => s.sopis.sopis) sopis;
  private academicYear: any[] = ACADEMIC_YEAR;
  private cycle: any[] = CYCLE;
  private term: any[] = TERM;

  constructor(
    public dialogRef: MatDialogRef<EditAssessmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.assessmentEditForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      programSopiId: [this.data.programSopiId, Validators.required],
      programCourseId: [this.data.programCourseId, Validators.required],
      term: [this.data.term, Validators.required],
      academicYear: [this.data.academicYear, Validators.required],
      cycle: [this.data.cycle, Validators.required],
      assessmentTask: [this.data.assessmentTask, Validators.required],
      assessmentLevel: [this.data.assessmentLevel, Validators.required],
      target: [this.data.target, Validators.required],
      passingGrade: [this.data.passingGrade, Validators.required],
      improvementPlan: [this.data.improvementPlan]
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form): void {
    if (this.assessmentEditForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.assessmentEditForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }
}
