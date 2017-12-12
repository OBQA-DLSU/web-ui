import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { InvitationRoutes } from './invitation.routing';
import { InvitationComponent } from './invitation.component';
import { ComponentModule } from './../components/component.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InvitationRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule
  ],
  declarations: []
})
export class InvitationModule { }
