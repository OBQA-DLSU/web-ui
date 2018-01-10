import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store'; 

import { SessionActionCreator } from '../../store/action-creators/session.actioncreator';
import { MiscActionCreator } from '../../store/action-creators/misc.actioncreator';
declare var $: any;
import { ISessionCreate } from '../../interfaces/session/session-create.interface';
@Component({
  selector: 'app-sign-in-cmp',
  templateUrl: './sign-in.component.html'
})

export class SignInComponent implements OnInit {
  @select(s => s.misc.toggleForgotPassword) toggleForgotPassword;
  @select(s => s.misc.signInBufferPage) signInBufferPage;
  @select(s => s.misc.spinner) spinner;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  private signInForm: FormGroup;

  constructor(
    private element: ElementRef,
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator,
    private miscActionCreator: MiscActionCreator
  ) 
    {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
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
    if (this.signInForm.valid) {
      this.sessionActionCreator.SessionCreate(this.signInForm.value);
      this.ngOnInit();
    } else {
      alert('Invalid form');
    }
  }

  forgotPasswordToggle() {
    this.miscActionCreator.ToggleForgotPassword();
    this.ngOnInit();
  }
}
