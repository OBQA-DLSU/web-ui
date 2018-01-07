import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import {
  MiscActionCreator,
  StudentActionCreator
} from '../../../store/action-creators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styles: []
})
export class ClassPageComponent implements OnInit {

  @select(s => s.misc.myClassId) myClassIdCode;
  @select(s => s.students.students) students;

  private routeSubscription: Subscription;
  private myClassId: number = null;
  private studentsData: any;
  private dataNames = ['studentId', 'lname', 'fname', 'email'];
  private dataNameAlias = ['Student ID', 'Lastname', 'Firstname', 'Email'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private miscActionCreator: MiscActionCreator,
    private studentActionCreator: StudentActionCreator
  ) { }
  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Class Details');
    this.routeSubscription = this.activatedRoute.params
      .subscribe(params => {
        this.myClassId = params.id;
        this.miscActionCreator.StoreMyClassId(params.id);
        (params.id) ? this.studentActionCreator.GetMyClassStudent(params.id) : null;
      });
  }

}
