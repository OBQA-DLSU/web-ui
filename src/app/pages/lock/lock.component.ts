import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {
	SessionActionCreator
} from '../../store/action-creators';

declare var $: any;

@Component({
	selector: 'app-lock-cmp',
	templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit, OnDestroy {
	@select(s => s.user.user) user;
	@select(s => s.misc.spinner) spinner;
	test: Date = new Date();
	private userSubscription: Subscription = null;
	private unlockForm: FormGroup;
	constructor (
		private router: Router,
		private sessionActionCreator: SessionActionCreator,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		setTimeout(function () {
			// after 1000 ms we add the class animated to the login/register card
			$('.card').removeClass('card-hidden');
		}, 700);

		this.userSubscription = this.user
		.subscribe(
			user => {
				if (!user) {
					this.router.navigate(['/pages/sign-in']);
			  }	else {
					this.unlockForm = this.formBuilder.group({
						email: [user.email, Validators.required],
						password: [null, Validators.required]
					});
				}
			},
			err => this.router.navigate(['/pages/sign-in'])
		);
		
	}

	ngOnDestroy() {
		(this.userSubscription) ? this.userSubscription.unsubscribe() : null;
	}

	onUnlock () {
		this.sessionActionCreator.RenewSession(this.unlockForm.value);
		this.ngOnInit();
	}

}
