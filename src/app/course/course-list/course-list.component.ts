import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CourseActionCreator } from '../../store/action-creators/course.actioncreator';
import { select } from '@angular-redux/store';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';


declare var $: any;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit, OnDestroy {

  @select(s => s.courses.courses) courses;
  private programId: number = 5;

  constructor(
    private courseActionCreator: CourseActionCreator,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  private dataNames = ['id', 'code', 'name', 'description', 'toBeAssessed'];
  private dataNameAlias = ['ID', 'Code', 'Name', 'Description', 'To Be Assessed?'];
  private editCourseForm: FormGroup;
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;

  ngOnInit() {
    this.courseActionCreator.GetCourse(this.programId);
  }

  ngOnDestroy() {
    (this.dialogRefSubscription) ? this.dialogRefSubscription.unsubscribe() : null;
  }

  onClickEdit(data) {
    this.dialogRef = this.dialog.open(EditCourseDialog, {
      width: '500px',
      data: { ...data }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('No Data.');
      } else {
        const newData = JSON.parse(result);
        this.courseActionCreator.UpdateCourse(newData.id, newData);
      }
    });

  }

  onClickDelete(data) {
    console.log(data);
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
      id: [this.data.id, Validators.required ],
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
