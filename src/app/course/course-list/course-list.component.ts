import { Component, OnInit, ElementRef } from '@angular/core';
import { CourseActionCreator } from '../../store/action-creators/course.actioncreator';

import { select } from '@angular-redux/store';

declare var $: any;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

  @select(s => s.courses.courses) courses;

  constructor (private courseActionCreator: CourseActionCreator ) {}

  private dataNames = ['id', 'code', 'name', 'description', 'toBeAssessed'];
  private dataNameAlias = ['ID', 'Code', 'Name', 'Description', 'To Be Assessed?'];

  ngOnInit () {
    this.courseActionCreator.GetCourse(5);
  }
}
