import { Component, OnInit } from '@angular/core';
import { SessionActionCreator } from './store/action-creators/session.actioncreator';

declare var $: any;

@Component({
	selector: 'app-my-app',
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

	constructor(
		private sessionActionCreator: SessionActionCreator
	) { }

	ngOnInit() {
		$.material.init();
		this.sessionActionCreator.SessionCheck();
	}
}
