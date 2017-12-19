import { Routes } from '@angular/router';
import { SessionGuard } from '../guards/session.guard';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
	{

		path: '',
		children: [{
			path: 'dashboard',
			component: DashboardComponent,
			canActivate: [SessionGuard]
		}]
	}
];
