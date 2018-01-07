import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import {
  CourseActionCreator,
  MiscActionCreator
} from '../../store/action-creators';

declare var $: any;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit, OnDestroy {

  @select(s => s.courses.courses) courses;
  @select(s => s.session.programId) programId;
  @select(s => s.session.isAdmin) isAdmin;

  constructor(
    private courseActionCreator: CourseActionCreator,
    private miscActionCreator: MiscActionCreator,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  private dataNames = ['id', 'code', 'name', 'description', 'toBeAssessed'];
  private dataNameAlias = ['ID', 'Code', 'Name', 'Description', 'To Be Assessed?'];
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;
  private programIdSubscription: Subscription = null;

  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Course List');
    this.programIdSubscription = this.programId.subscribe(
      programId => this.courseActionCreator.GetCourse(programId),
      err => null
    );
  }

  ngOnDestroy() {
    (this.dialogRefSubscription) ? this.dialogRefSubscription.unsubscribe() : null;
    (this.programIdSubscription) ? this.programIdSubscription.unsubscribe() : null;
  }

  onClickEdit(data) {
    this.dialogRef = this.dialog.open(EditCourseDialog, {
      width: '500px',
      data: { ...data }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      } else {
        const newData = JSON.parse(result);
        this.courseActionCreator.UpdateCourse(newData.id, newData);
      }
    });

  }

  async onClickDelete(data) {
    let x = await swal({
      title: 'Are you sure?',
      text: `You are about to delete ${data.code} in the list of Courses.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (data) {
      if (data.value) { return true; }
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          text: 'The course has not been deleted.',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        });
      }
    }).catch(swal.noop);
    if (x) {
      this.courseActionCreator.DeleteCourse(data.id, data);
    }
  }
}

@Component({
  selector: 'dialog-course-form',
  templateUrl: './dialog-course-form.html',
})
export class EditCourseDialog implements OnInit, OnDestroy {

  private courseEditForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.courseEditForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      code: [this.data.code, Validators.required],
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      toBeAssessed: [this.data.toBeAssessed, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form): void {
    if (this.courseEditForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.courseEditForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }

}
