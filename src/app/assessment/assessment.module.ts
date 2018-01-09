import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { AssessmentListComponent, EditAssessmentDialog } from './assessment-list/assessment-list.component';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { AssessmentRoutes } from './assessment.routing';
import { ComponentModule } from './../components/component.module';
import { AssessmentDiscussionComponent } from './assessment-list/assessment-discussion/assessment-discussion.component';
import { DirectiveModule, SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AssessmentRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule
  ],
  declarations: [
    AssessmentListComponent,
    AddAssessmentComponent,
    EditAssessmentDialog,
    AssessmentDiscussionComponent
  ],
  entryComponents: [
    EditAssessmentDialog,
    SpinnerComponent
  ]
})
export class AssessmentModule { }
