import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { INSTRUCTOR_ROUTES } from './instructor-menu.constant';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
declare const $: any;

//Metadata
export interface RouteInfo {
	path: string;
	title: string;
	type: string;
	icontype: string;
	collapse?: string;
	children?: ChildrenItems[];
}

export interface ChildrenItems {
	path: string;
	title: string;
	ab: string;
	type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
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
		{ path: 'list', title: 'Course List', ab: 'CL' },
		{ path: 'add-course', title: 'Add Course', ab: 'AC' }
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
		{ path: 'list', title: 'Sopi List', ab: 'SL'},
		{ path: 'add-sopi', title: 'Add Sopi', ab: 'AS'}
	]
}, {
	path: '/assessment',
	title: 'Assessment',
	type: 'sub',
	icontype: 'accessibility',
	collapse: 'Assessment',
	children: [
		{ path: 'list', title: 'Assessment List', ab: 'AL'},
		{ path: 'add-assessment', title: 'Add Assessment', ab: 'AA'}
	]
}, {
	path: '/pages',
	title: 'Options',
	type: 'sub',
	icontype: 'image',
	collapse: 'pages',
	children: [
		{ path: 'lock', title: 'Lock', ab: 'L' },
		{ path: 'authentication', title: 'Role Change', ab: 'RC'}
	]
}, {
	path: '/invitation',
	title: 'Invitation',
	type: 'link',
	icontype: 'dashboard'
}
];

@Component({
	selector: 'app-sidebar-cmp',
	templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, OnDestroy {
	@select(s => s.session) session;
	public sessionSubscription: Subscription = null;
	public menuItems: any[];
	constructor(
		private router: Router
	){}

	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	};

	isAdmin(data) {
		let isAdmin = data.isAdmin;
		return isAdmin;
	}

	ngOnInit() {
		this.sessionSubscription = this.session
		.map(data => this.isAdmin(data))
		.subscribe(
			isAdmin => {
				if (isAdmin) { this.menuItems = ROUTES.filter(menuItem => menuItem); }
				else { this.menuItems = INSTRUCTOR_ROUTES.filter(menuItem => menuItem); }
			}
		);
	}
	ngOnDestroy() {
		(this.sessionSubscription) ? this.sessionSubscription.unsubscribe() : null;
	}
	updatePS(): void {
		if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
			const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
			let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
		}
	}
	isMac(): boolean {
		let bool = false;
		if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
			bool = true;
		}
		return bool;
	}
	redirectToProfile() {
    this.router.navigate(['/profile']);
  }
	onSignOut() {
		this.router.navigate(['/pages/sign-in']);
	}
}
