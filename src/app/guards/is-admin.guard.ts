import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogService } from '../services/dialog.service';
import { SessionActionCreator } from '../store/action-creators/session.actioncreator';
import { select } from '@angular-redux/store';

@Injectable()
export class IsAdminGuard implements CanActivate, CanActivateChild, OnDestroy {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  @select(s => s.session.isAdmin) isAdmin;

  private isAdminSubscription: Subscription = null;
  private admin: boolean = false;

  constructor (
    private sessionActionCreator: SessionActionCreator,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.isAdminSubscription = this.isAdmin.subscribe(
      token => {
        if (!token) {
          this.admin = false;
        } else {
          this.admin = true;
        }
      }, err => {
        this.admin = false;
      }
    );
  }

  ngOnDestroy() {
    (this.isAdminSubscription) ? this.isAdminSubscription.unsubscribe() : null;
  }
  
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.sessionActionCreator.SessionCheck();
    if (!this.admin) {
      this.dialogService.showSwal('error-message', {
        title: 'Content unavailable!',
        text: 'Sorry, this content is not available for you.'
      });
      this.router.navigate(['./dashboard']);
    } else {
      return true;
    }
  }

  canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.sessionActionCreator.SessionCheck();
    if (!this.admin) {
      this.dialogService.showSwal('error-message', {
        title: 'Content unavailable!',
        text: 'Sorry, this content is not available for you.'
      });
      this.router.navigate(['./dashboard']);
    } else {
      return true;
    }
  }

}
