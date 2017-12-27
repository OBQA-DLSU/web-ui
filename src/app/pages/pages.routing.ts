import { Routes } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LockComponent } from './lock/lock.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthFilterComponent } from './sign-in/auth-filter/auth-filter.component';

export const PagesRoutes: Routes = [

  {
    path: '',
    children: [{
      path: 'sign-in',
      component: SignInComponent
    }, {
      path: 'lock',
      component: LockComponent
    }, {
      path: 'sign-up',
      component: SignUpComponent
    }, {
      path: 'sign-up/:code',
      component: SignUpComponent
    }, {
      path: 'authentication',
      component: AuthFilterComponent
    }]
  }
];
