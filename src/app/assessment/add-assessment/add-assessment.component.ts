import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { 
  AssessmentActionCreator,
  CourseActionCreator,
  SopiActionCreator,
  MiscActionCreator
} from '../../store/action-creators';
import {
  WEB_API_URL,
  ACADEMIC_YEAR,
  TERM,
  CYCLE
} from '../../config';
declare var $: any;

@Component({
  selector: 'app-add-course',
  templateUrl: './add-assessment.component.html'
})

export class AddAssessmentComponent implements OnInit, OnDestroy {

  private uploadUrl: string;;
  @select(s => s.session.programId) programId;
  @select(s => s.courses.courses) courses;
  @select(s => s.sopis.sopis) sopis;
  @select(s => s.misc.spinner) spinner;
  private programIdSubscription: Subscription = null;
  private assessmentForm: FormGroup;
  private academicYear: any[] = ACADEMIC_YEAR;
  private term: any[] = TERM;
  private cycle: any[] = CYCLE;
  constructor(
    private formBuilder: FormBuilder,
    private assessmentActionCreator: AssessmentActionCreator,
    private sopiActionCreator: SopiActionCreator,
    private courseActionCreator: CourseActionCreator,
    private miscActionCreator: MiscActionCreator
  ) {

    this.programIdSubscription = this.programId.subscribe(
      programId => {
        this.sopiActionCreator.GetSopi(programId);
        this.courseActionCreator.GetCourse(programId);
        this.uploadUrl = `${WEB_API_URL}/api/assessment/bulk/${programId}`;
      }
    );
  }

  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Add Assessment');
    this.assessmentForm = this.formBuilder.group({
      programSopiId: [null, Validators.required],
      programCourseId: [null, Validators.required],
      assessmentLevel: [null, Validators.required],
      target: [null, Validators.required],
      assessmentTask: [null, Validators.required],
      passingGrade: [null, Validators.required],
      performance: [null],
      improvementPlan: [null],
      term: [null, Validators.required],
      academicYear: [null, Validators.required],
      cycle: [null, Validators.required],
    });
  }

  ngOnDestroy() {
    (this.programIdSubscription) ? this.programIdSubscription.unsubscribe() : null;
  }

  submit (event) {
    if (this.assessmentForm.valid) {
      this.programIdSubscription = this.programId.subscribe(
        programId => {
          this.assessmentActionCreator.CreateAssessment(programId, this.assessmentForm.value);
          this.ngOnInit();
        }
      );
    }
  }
}
