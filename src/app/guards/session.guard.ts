import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogService } from '../services/dialog.service';
import { SessionActionCreator } from '../store/action-creators/session.actioncreator';
import { select } from '@angular-redux/store';

@Injectable()
export class SessionGuard implements CanActivate, OnDestroy {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  @select(s => s.session.token) token

  private tokenSubscription: Subscription = null;
  private session: boolean = false;

  constructor (
    private sessionActionCreator: SessionActionCreator,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.tokenSubscription = this.token.subscribe(
      token => {
        if (!token) {
          this.session = false;
        } else {
          this.session = true;
        }
      }, err => {
        this.session = false;
      }
    );
  }

  ngOnDestroy () {
    (this.tokenSubscription)? this.tokenSubscription.unsubscribe() : null;
  }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.sessionActionCreator.SessionCheck();
    if (!this.session) {
      this.dialogService.showSwal('error-message', {
        title: 'Your Session Has Expired!',
        text: 'Please Sigin in.'
      });
      this.router.navigate(['./pages/sign-in']);
    } else {
      return true;
    }
  }
}
