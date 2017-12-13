import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { InvitationComponent } from './invitation.component';
import { InvitationRoutes } from './invitation.routing';
import { DynamicFormModule } from './../obqa-forms/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InvitationRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DynamicFormModule
  ],
  declarations: [InvitationComponent]
})
export class InvitationModule { }
