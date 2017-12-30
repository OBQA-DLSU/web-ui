import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {  } from '@angular/core';

export const ProfileRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'profile',
      component: ProfileComponent
    }]
  }
];