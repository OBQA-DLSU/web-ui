import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import { MyClassActionCreator } from '../../store/action-creators/my-class.actioncreator';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styles: []
})
export class ClassListComponent implements OnInit, OnDestroy {

  @select(s => s.myClasses.myClasses) myClasses;
  @select(s => s.session) session;
  private user: IUser;
  private instructorId: string; //string is required as parameter
  private programId: number;


  constructor(
    private myClassActionCreator: MyClassActionCreator,
    private router: Router
  ) { }

  private dataNames = ['id', 'course', 'term', 'academicYear', 'cycle'];
  private dataNameAlias = ['ID', 'Course', 'Term', 'A.Y.', 'Cycle'];

  ngOnInit() {
    this.session.subscribe(
      (session => {
        this.instructorId = session.instructorId;
        (this.instructorId)
        ? this.myClassActionCreator.GetMyClassWithFilter('instructorId', this.instructorId) : null;
      })
    );
  }

  ngOnDestroy() {}

  onMoreClick(data) {
    this.router.navigate([`/class/class-details/${data.id}`]);
  }

  async onClickDelete(data) {
    let x = await swal({
      title: 'Are you sure?',
      text: `You are about to delete Class ID: ${data.id}, ${data.course}, Term: ${data.term}, Academic Year ${data.academicYear}.`,
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
          text: 'The Class has not been deleted.',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        });
      }
    }).catch(swal.noop);
    if (x) {
      this.myClassActionCreator.DeleteMyClass(data.id, data);
    }
  }

}
