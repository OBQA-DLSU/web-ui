import { Routes } from '@angular/router';
import { SessionGuard } from '../guards/session.guard';
import { CourseListComponent } from 'app/course/course-list/course-list.component';
import { AddCourseComponent } from 'app/course/add-course/add-course.component';


export const CourseRoutes: Routes = [
	{

		path: '',
		canActivate: [SessionGuard],
		children: [
			{
				path: 'list',
				component: CourseListComponent
			}, {
				path: 'add-course',
				component: AddCourseComponent
			}
		]
	}
];
