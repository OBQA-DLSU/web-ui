import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { IAssessmentView } from '../../interfaces/assessment/assessment-view.interface';
import { IMyClassView } from '../../interfaces/myClass/my-class-view.interface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-evidence-class-view',
  templateUrl: './evidence-class-view.component.html',
  styleUrls: ['./evidence-class-view.component.scss']
})
export class EvidenceClassViewComponent implements OnInit, OnDestroy {

  @Input() assessments: Observable<IAssessmentView[]>;
  @Input() selectedClass: Observable<IMyClassView>;
  private assessmentsSubscription: Subscription = null;
  private assessmentData: IAssessmentView[];
  private selectedAssessment: IAssessmentView;
  private selectedClassSubscription: Subscription = null;
  private selectedClassData: IMyClassView;

  constructor() { }

  ngOnInit() {
    this.assessmentsSubscription = this.assessments
    .subscribe(
      (assessments:IAssessmentView[]) => {
        this.assessmentData = assessments;
        this.selectedAssessment = assessments[0];
      }
    );
    this.selectedClassSubscription = this.selectedClass
    .subscribe(
      (selectedClass: IMyClassView) => {
        this.selectedClassData = selectedClass;
      }
    );
  }

  ngOnDestroy() {
    (this.assessmentsSubscription) ? this.assessmentsSubscription.unsubscribe() : null;
  }

  onSelectAssessment(assessmentId) {
    this.selectedAssessment = _.find(this.assessmentData, (a) => {
      return a.id === assessmentId;
    });
  }

}
