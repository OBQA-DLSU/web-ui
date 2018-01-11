import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit, OnDestroy {

  @select(s => s.myClasses.selectedClass) selectedClass;
  @select(s => s.students.students) students;
  private selectedClassData: any;
  private studentData: any;
  private selectedClassSubscription: Subscription = null;
  private studentSubscription: Subscription = null;

  constructor() {
    this.selectedClassSubscription = this.selectedClass
    .subscribe(
      selectedClass => {
        this.selectedClassData = selectedClass;
        this.studentSubscription = this.students
        .subscribe(
          students => this.studentData = students
        );
      }
    );
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    (this.selectedClassSubscription) ? this.selectedClassSubscription.unsubscribe() : null;
    (this.studentSubscription) ? this.studentSubscription.unsubscribe() : null;
  }

}
