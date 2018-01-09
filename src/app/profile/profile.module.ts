import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ProfileRoutes } from './profile.routing';
import { ProfileComponent, ChangePasswordDialog } from './profile.component';
import { DirectiveModule, SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild(ProfileRoutes),
    DirectiveModule
  ],
  declarations: [ProfileComponent, ChangePasswordDialog],
  entryComponents: [
    ChangePasswordDialog,
    SpinnerComponent
  ]
})
export class ProfileModule { }