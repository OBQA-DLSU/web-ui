import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../app.module';
import { PagesRoutes } from './pages.routing';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LockComponent } from './lock/lock.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ComponentModule } from '../components/component.module';
import { AuthFilterComponent } from './sign-in/auth-filter/auth-filter.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    LockComponent,
    AuthFilterComponent
  ]
})

export class PagesModule {}
