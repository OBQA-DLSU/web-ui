import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
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
		}, {
			path: 'pricing',
			component: PricingComponent
		}]
	}
];
