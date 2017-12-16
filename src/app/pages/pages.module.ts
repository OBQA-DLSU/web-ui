import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LockComponent } from './lock/lock.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ComponentModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    LockComponent
  ]
})

export class PagesModule {}
