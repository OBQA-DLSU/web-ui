import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ProfileRoutes } from './profile.routing';
import { ProfileComponent, ChangePasswordDialog } from './profile.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild(ProfileRoutes)
  ],
  declarations: [ProfileComponent, ChangePasswordDialog],
  entryComponents: [
    ChangePasswordDialog
  ]
})
export class ProfileModule { }