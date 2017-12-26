import { Component, OnInit, ElementRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
declare var $: any;
@Component({
  selector: 'app-auth-filter-component',
  templateUrl: './auth-filter.component.html'
})

export class AuthFilterComponent implements OnInit {
  private program: string = 'option2';
  private authSelectionForm: FormGroup;
  @select(s => s.session) session;
  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {
    this.authSelectionForm = this.formBuilder.group({
      programId: [null, Validators.required],
      isStudent: [false, Validators.required]
    });

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }
  submit(){
    if (this.authSelectionForm.valid) {
      console.log(this.authSelectionForm.value);
    } else {
      alert('Invalid form');
    }
  }
}
