import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import { IStudentView } from './../../../interfaces/student/student-view.interface';
import { MiscActionCreator, StudentActionCreator } from '../../../store/action-creators/index';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styles: []
})
export class ClassPageComponent implements OnInit {

  @select(s => s.misc.myClassId) myClassIdCode;
  @select(s => s.students.myClassStudents.myClassStudents) myClassStudents;

  private routeSubscription: Subscription;
  private myClassId: any = null;

  private dataNames = ['studentId', 'status'];
  private dataNameAlias = ['Student ID', 'Status'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private miscActionCreator: MiscActionCreator,
    private studentActionCreator: StudentActionCreator
  ) { }
  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params
      .subscribe(params => {
        this.myClassId = params.id;
        this.miscActionCreator.StoreMyClassId(params.id);
      })
  }

}
