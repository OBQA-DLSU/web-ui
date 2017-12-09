import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { SignInComponent } from './sign-in/sign-in.component';

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
			path: 'register',
			component: RegisterComponent
		}]
	}
];
