import { Routes } from '@angular/router';
import { CourseListComponent } from 'app/course/course-list/course-list.component';
import { AddCourseComponent } from 'app/course/add-course/add-course.component';


export const CourseRoutes: Routes = [
	{

		path: '',
		children: [{
			path: 'list',
			component: CourseListComponent
		}]},{
		path: '',
		children: [{
			path: 'add-course',
			component: AddCourseComponent
		}]

	}
];
