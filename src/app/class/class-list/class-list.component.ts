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
  private programId: number = 5;
  private user: IUser;

  constructor(
    private myClassActionCreator: MyClassActionCreator,
    private router: Router
  ) { }

  private dataNames = ['id', 'course', 'term', 'academicYear', 'cycle'];
  private dataNameAlias = ['ID', 'Course', 'Term', 'A.Y.', 'Cycle'];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('session')).user;
    this.myClassActionCreator.GetMyClassWithFilter('instructorId', '1');
  }

  ngOnDestroy() {}

  onMoreClick(data) {
    console.log(data.id);
    this.router.navigate(['./class/class-details/'+data.id]);
  }

}
