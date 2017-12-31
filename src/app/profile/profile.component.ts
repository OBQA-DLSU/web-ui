import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SessionActionCreator } from '../store/action-creators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  @select(s => s.user.user) user;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private sessionActionCreator: SessionActionCreator
  ) {}
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;
  private email: string;

  ngOnInit() {
    this.user.subscribe(
      (data => {
        this.email = data.email;
      })
    )
  }

  onChangePassword() {
    this.dialogRef = this.dialog.open(ChangePasswordDialog, {
      width: '300px',
      data: this.email
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      const newData = JSON.parse(result);
      const { email, password, newPassword, confirmation } = newData;
      if (!result) {
      } else {
        console.log(newData);
        console.log(result);
        this.sessionActionCreator.ChangePassword(email, password, newPassword, confirmation);
      }
    });
  }

}

@Component({
  selector: 'dialog-changePassword-form',
  templateUrl: './dialog-changePassword-form.html',
})
export class ChangePasswordDialog implements OnInit, OnDestroy {

  private changePasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmation: [null, Validators.required],
      email: [this.data, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form): void {
    if (this.changePasswordForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.changePasswordForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }

}

