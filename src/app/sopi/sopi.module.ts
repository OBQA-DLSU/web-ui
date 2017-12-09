import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { SopiRoutes } from './sopi.routing';
import { SopiListComponent } from './sopi-list/sopi-list.component';
import { AddSopiComponent } from './add-sopi/add-sopi.component';
import { ComponentModule } from './../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SopiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule
  ],
  declarations: [SopiListComponent,AddSopiComponent]
})
export class SopiModule { }
