import { Routes } from '@angular/router';
import { InvitationComponent } from './invitation.component';

export const InvitationRoutes: Routes = [
  {
    path: '',
		children: [{
			path: 'dashboard',
			component: InvitationComponent
		}]
  }
];
