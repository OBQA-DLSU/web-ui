import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import {
  AssessmentActionCreator,
  AssessmentDiscussionActionCreator
} from '../../../store/action-creators';
@Component({
  selector: 'app-assessment-discussion',
  templateUrl: './assessment-discussion.component.html'
})
export class AssessmentDiscussionComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription = null;

  constructor(
    private assessmentActionCreator: AssessmentActionCreator,
    private assessmentDiscussionActionCreator: AssessmentDiscussionActionCreator,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeSubscription = this.activatedRoute.params
    .subscribe(params => {
      this.assessmentActionCreator.SelectAssessment(params.assessmentId);
      this.assessmentDiscussionActionCreator.GetAssessmentDiscussion(params.assessmentId);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    (this.routeSubscription) ? this.routeSubscription.unsubscribe() : null;
  }

}
