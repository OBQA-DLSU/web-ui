import { Routes } from '@angular/router';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentDiscussionComponent } from './assessment-list/assessment-discussion/assessment-discussion.component';

export const AssessmentRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: AssessmentListComponent
    }]
  }, {
    path: '',
    children: [
      {
        path: 'add-assessment',
        component: AddAssessmentComponent
      }, {
        path: 'discussion/:assessmentId',
        component: AssessmentDiscussionComponent
      }
    ]
  }
];
