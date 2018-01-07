import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MiscActionCreator } from '../store/action-creators';
declare const $: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
	
	constructor (
		private miscActionCreator: MiscActionCreator
	) {}

	ngOnInit () {
		this.miscActionCreator.UpdatePageTitle('Dashboard');
	}

	ngAfterViewInit () {
		
	}
}
