import { select } from '@angular-redux/store';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SessionActionCreator } from '../../store/action-creators/session.actioncreator';
import { UserActionCreator } from '../../store/action-creators/user.actioncreator';
import { ISessionCreate } from '../../interfaces/session/session-create.interface';
import { MiscActionCreator } from '../../store/action-creators/misc.actioncreator';
import { IUserCreate } from '../../interfaces/user/user-create.interface';

import swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-sign-up-cmp',
  templateUrl: './sign-up.component.html'
})

export class SignUpComponent implements OnInit, OnDestroy {

  @select(s => s.misc.invitationCode) myInvitationCode;

  private routeSubscription: Subscription;
  private invitationCode: string;
  private signUpForm: FormGroup;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  constructor(
    private element: ElementRef,
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator,
    private activatedRoute: ActivatedRoute,
    private miscActionCreator: MiscActionCreator,
    private userActionCreator: UserActionCreator
  ) 
    {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params
    .subscribe(params => {
      this.invitationCode = params.code;
      this.miscActionCreator.StoreInvitationCode(params.code);
    })
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);

    this.signUpForm = this.formBuilder.group({
      email: [null, Validators.required],
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      idNumber: [null, Validators.required],
      password: [null, Validators.required],
      confirmation: [null, Validators.required],
      invitationCode: [this.invitationCode, Validators.required]
    });
  }
  ngOnDestroy() {
    (this.routeSubscription) ? this.routeSubscription.unsubscribe() : null;
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
  submit(){
    if (this.signUpForm.valid) {
      this.userActionCreator.CreateUser(this.signUpForm.value);
    } else {
      
    }
  }
}
