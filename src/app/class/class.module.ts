import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { AddClassComponent } from './add-class/add-class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassRoutes } from './class.routing';
import { ComponentModule } from './../components/component.module';
import { ClassPageComponent } from './class-list/class-page/class-page.component';
import { DirectiveModule, SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClassRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule
  ],
  declarations: [
    AddClassComponent,
    ClassListComponent,
    ClassPageComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class ClassModule { }
