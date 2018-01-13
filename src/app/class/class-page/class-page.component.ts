import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import {
  MiscActionCreator,
  MyClassActionCreator,
  StudentActionCreator
} from '../../store/action-creators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styles: []
})
export class ClassPageComponent implements OnInit {

  @select(s => s.myClasses.selectedClass) selectedClass;
  @select(s => s.students.students) students;
  @select(s => s.myClasses.spinner) spinner;

  private routeSubscription: Subscription;
  private myClassId: number = null;
  private studentsData: any;
  private dataNames = ['studentId', 'lname', 'fname', 'email'];
  private dataNameAlias = ['Student ID', 'Lastname', 'Firstname', 'Email'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private miscActionCreator: MiscActionCreator,
    private myClassActionCreator: MyClassActionCreator,
    private studentActionCreator: StudentActionCreator
  ) { }
  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Class Details');
    this.routeSubscription = this.activatedRoute.params
      .subscribe(params => {
        this.myClassId = params.id;
        this.myClassActionCreator.GetOneMyClass(params.id);
        this.studentActionCreator.GetMyClassStudent(params.id);
      });
  }
}
