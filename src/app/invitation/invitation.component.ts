import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { select } from '@angular-redux/store';
import { IUserInvite } from '../interfaces/user/user-invite.interface';
import {
  InviteActionCreator,
  MiscActionCreator
} from '../store/action-creators';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html'
})
export class InvitationComponent implements OnInit {

  @select(s => s.invite.spinner) spinner;

  constructor (
    private formBuilder: FormBuilder,
    private miscActionCreator: MiscActionCreator,
    private inviteActionCreator: InviteActionCreator
  ) {}

  invitationForm: FormGroup;
  invitationItems:any = [];
  
  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Invitation');
    this.invitationForm = this.formBuilder.group({
      invitationItems: this.formBuilder.array([ this.createItem() ])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      email: [null, Validators.required],
      roleId: [2, Validators.required],
      programId: [1, Validators.required],
      isAdmin: [false, Validators.required],
      isStudent: [true, Validators.required]
    });
  }

  addItem(): void {
    this.invitationItems = this.invitationForm.get('invitationItems') as FormArray;
    if (this.invitationItems.length < this.inviteLimit) {
      this.invitationItems.push(this.createItem());
    }
  }

  submit(): void {
    if (this.invitationForm.valid) {
      this.inviteActionCreator.SendGroupInvite(this.invitationForm.value);
      this.ngOnInit();
    }
  }

  isInviteLimit(): boolean {
    if (this.invitationItems.length < this.inviteLimit) {
      return false;
    } else {
      return true;
    }
  }

  private inviteLimit: number = 5;

  private programs: any[] = [
    {id: 1, name: 'Chemical Engineering'},
    {id: 2, name: 'Civil Engineering'},
    {id: 3, name: 'Computer Engineering'},
    {id: 4, name: 'Electronics and Communication Engineering'},
    {id: 5, name: 'Industrial Engineering'},
    {id: 6, name: 'Manufacturing Engineering and Management'},
    {id: 7, name: 'Mechanical Engineering'}
  ];

  private isAdminOptions: any[] = [
    { isAdmin: true, name: 'Coordinator' },
    { isAdmin: false, name: 'Regular'}
  ];

  private isStudentOptions: any[] = [
    { isStudent: true, name: 'Student' },
    { isStudent: false, name: 'Faculty'}
  ];

}
