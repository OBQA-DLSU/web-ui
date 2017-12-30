import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SessionGuard } from 'app/guards/session.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },{
        path: '',
        loadChildren: './profile/profile.module#ProfileModule'
      }, {
        path: 'course',
        loadChildren: './course/course.module#CourseModule'
      }, {
        path: 'sopi',
        loadChildren: './sopi/sopi.module#SopiModule'
      }, {
        path: 'class',
        loadChildren: './class/class.module#ClassModule'
      }, {
        path: 'assessment',
        loadChildren: './assessment/assessment.module#AssessmentModule'
      }, {
        path: 'invitation',
        loadChildren: './invitation/invitation.module#InvitationModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'pages',
      loadChildren: './pages/pages.module#PagesModule'
    }]
  }, {
    path: '',
    redirectTo: 'pages/sign-in',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: 'pages/sign-in',
    pathMatch: 'full'
  }
];
