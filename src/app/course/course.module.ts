import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { CourseRoutes } from './course.routing';
import { CourseListComponent, EditCourseDialog  } from './course-list/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ComponentModule } from 'app/components/component.module';
import { SpinnerComponent, DirectiveModule } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CourseRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule
  ],
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    EditCourseDialog
  ],
  entryComponents: [
    EditCourseDialog,
    SpinnerComponent
  ]
})
export class CourseModule { }
