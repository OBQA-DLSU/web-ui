import { RouteInfo } from './sidebar.component';
export const INSTRUCTOR_ROUTES: RouteInfo[] = [{
	path: '/dashboard',
	title: 'Dashboard',
	type: 'link',
	icontype: 'dashboard'
}, {
	path: '/course',
	title: 'Course',
	type: 'sub',
	icontype: 'subject',
	collapse: 'course',
	children: [
		{ path: 'list', title: 'Course List', ab: 'CL' }
	]
},  {
	path: '/class',
	title: 'Class',
	type: 'sub',
	icontype: 'chrome_reader_mode',
	collapse: 'class',
	children: [
		{ path: 'list', title: 'Class List', ab: 'CL'},
		{ path: 'add-class', title: 'Add Class', ab: 'AC'}
	]
}, {
	path: '/sopi',
	title: 'Sopi',
	type: 'sub',
	icontype: 'assignment',
	collapse: 'sopi',
	children: [
		{ path: 'list', title: 'Sopi List', ab: 'SL'}
	]
}, {
	path: '/assessment',
	title: 'Assessment',
	type: 'sub',
	icontype: 'accessibility',
	collapse: 'Assessment',
	children: [
		{ path: 'list', title: 'Assessment List', ab: 'AL'}
	]
}, {
	path: '/pages',
	title: 'Pages',
	type: 'sub',
	icontype: 'image',
	collapse: 'pages',
	children: [
		{ path: 'sign-in', title: 'Sign-in Page', ab: 'SP' },
		{ path: 'sign-up', title: 'Sign-up Page', ab: 'SP' },
		{ path: 'user', title: 'User Page', ab: 'UP' }
	]
}, {
	path: '/invitation',
	title: 'Invitation',
	type: 'link',
	icontype: 'dashboard'
}
];