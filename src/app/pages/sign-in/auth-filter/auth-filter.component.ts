import { Component, OnInit, ElementRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import * as _ from 'lodash';
import { SessionActionCreator } from './../../../store/action-creators/session.actioncreator';
declare var $: any;
@Component({
  selector: 'app-auth-filter-component',
  templateUrl: './auth-filter.component.html'
})

export class AuthFilterComponent implements OnInit {
  private authSelectionForm: FormGroup;
  private tempSession: object;

  @select(s => s.session) session;
  constructor(
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator
  ){}

  ngOnInit() {
    this.session.subscribe(
      data => this.tempSession
    );
    this.authSelectionForm = this.formBuilder.group({
      programId: [null, Validators.required],
      isStudent: [false, Validators.required]
    });

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }

  submit(event){
    console.log(event.value);
    // this.session.subscribe(
    //   (session => {
    //     const isStudent = event.isStudent;
    //     const programId = Number(event.programId);
    //     let index = _.findIndex(session.user.instructors, (d) => { return d.programId === programId});
    //     let isAdmin = session.user.instructors[index].isAdmin;
    //     let program = session.user.instructors[index].program;
    //     this.sessionActionCreator.SessionUpdate(isStudent, isAdmin, programId, program);
    //   })
    // );
    // console.log(JSON.parse(localStorage.getItem('session')));
  }
}
