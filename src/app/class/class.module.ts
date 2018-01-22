import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { StudentModule, AddStudentDialogComponent, UpdateStudentDialogComponent } from '../student';
import { GradeModule, AddGradeDialogComponent } from '../grade';
import { EvidenceModule, EvidenceClassViewComponent } from '../evidence';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassRoutes } from './class.routing';
import { ComponentModule } from './../components/component.module';
import { ClassPageComponent } from './class-page/class-page.component';
import { DirectiveModule, SpinnerComponent } from '../directives';
import { UpdateClassDialogComponent } from './update-class/update-class-dialog.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassRecordComponent } from './class-record/class-record.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClassRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule,
    StudentModule,
    GradeModule,
    EvidenceModule
  ],
  declarations: [
    AddClassComponent,
    ClassListComponent,
    ClassPageComponent,
    UpdateClassDialogComponent,
    ClassDetailsComponent,
    ClassRecordComponent
  ],
  entryComponents: [
    SpinnerComponent,
    UpdateClassDialogComponent,
    AddStudentDialogComponent,
    AddGradeDialogComponent,
    UpdateStudentDialogComponent
  ]
})
export class ClassModule { }
