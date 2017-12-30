import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { AssessmentListComponent, EditAssessmentDialog } from './assessment-list/assessment-list.component';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { AssessmentRoutes } from './assessment.routing';
import { ComponentModule } from './../components/component.module';
import { DynamicFormModule } from './../obqa-forms/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AssessmentRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DynamicFormModule
  ],
  declarations: [
    AssessmentListComponent,
    AddAssessmentComponent,
    EditAssessmentDialog
  ],
  entryComponents: [
    EditAssessmentDialog
  ]
})
export class AssessmentModule { }
