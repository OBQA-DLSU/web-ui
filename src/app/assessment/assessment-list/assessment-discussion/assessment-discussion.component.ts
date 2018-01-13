import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import {
  AssessmentActionCreator,
  AssessmentDiscussionActionCreator
} from '../../../store/action-creators';
@Component({
  selector: 'app-assessment-discussion',
  templateUrl: './assessment-discussion.component.html',
  styleUrls: ['./assessment-discussion.component.scss']
})
export class AssessmentDiscussionComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription = null;
  private instructorIdSubscription: Subscription = null;
  private discussionForm: FormGroup;
  @select(s => s.session.instructorId) instructorId;
  @select(s => s.assessmentDiscussions.assessmentDiscussions) assessmentDiscussions;
  @select(s => s.assessmentDiscussions.spinner) spinner;

  constructor(
    private assessmentActionCreator: AssessmentActionCreator,
    private assessmentDiscussionActionCreator: AssessmentDiscussionActionCreator,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.routeSubscription = this.activatedRoute.params
    .subscribe(params => {
      this.assessmentActionCreator.SelectAssessment(params.assessmentId);
      this.assessmentDiscussionActionCreator.GetAssessmentDiscussion(params.assessmentId);
      this.instructorIdSubscription = this.instructorId
      .subscribe(
        instructorId => {
          this.discussionForm = this.formBuilder.group({
            assessmentId: [parseInt(params.assessmentId), Validators.required],
            instructorId: [instructorId, Validators.required],
            discussion: [null, Validators.required]
          });
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    (this.routeSubscription) ? this.routeSubscription.unsubscribe() : null;
    (this.instructorIdSubscription) ? this.instructorIdSubscription.unsubscribe() : null;
  }

  submitComment () {
    if(this.discussionForm.valid) {
      this.assessmentDiscussionActionCreator.CreateAssessmentDiscusssion(
        this.discussionForm.value.assessmentId,
        this.discussionForm.value
      );
      this.resetForm();
    }
  }

  resetForm () {
    this.discussionForm = this.formBuilder.group({
      assessmentId: [this.discussionForm.value.assessmentId, Validators.required],
      instructorId: [this.discussionForm.value.instructorId, Validators.required],
      discussion: [null, Validators.required]
    });
  }

}
