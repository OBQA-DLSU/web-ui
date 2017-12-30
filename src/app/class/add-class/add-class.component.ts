import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CourseActionCreator } from '../../store/action-creators/course.actioncreator';
import { InstructorActionCreator } from '../../store/action-creators/instructor.actioncreator';
import { select } from '@angular-redux/store';
import { MyClassActionCreator } from '../../store/action-creators/my-class.actioncreator';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styles: []
})
export class AddClassComponent implements OnInit {
  @select(s => s.courses.courses) courses;
  @select(s => s.instructors.instructors) instructors;
  @select(s => s.session) session;
  private programId: number;
  private isAdmin: boolean;
  private instructorId: number;
  private myClassForm: FormGroup;
  private academicYearData = [
    {
      value: '2017-2018',
      name: '2017-2018'
    }, {
      value: '2018-2019',
      name: '2018-2019'
    }, {
      value: '2019-2020',
      name: '2019-2020'
    }
  ];
  private termData = [
    {
      value: 1,
      name: 'Term 1'
    }, {
      value: 2,
      name: 'Term 2'
    }, {
      value: 3,
      name: 'Term 3'
    }
  ];
  private cycleData = [
    {
      value: 1,
      name: 'Cycle 1'
    }, {
      value: 2,
      name: 'Cycle 2'
    }, {
      value: 3,
      name: 'Cycle 3'
    }
  ];
  constructor(
    private courseActionCreator: CourseActionCreator,
    private instructorActionCreator: InstructorActionCreator,
    private myClassActionCreator: MyClassActionCreator,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.session.subscribe(
    (session => {
      this.programId = session.program.id;
      this.isAdmin = session.isAdmin;
      this.instructorId = session.user.instructors[0].id;
    })
    );
    this.courseActionCreator.GetCourse(this.programId);
    this.instructorActionCreator.GetInstructor(this.programId);
    this.myClassForm = this.formBuilder.group({
      term: [null, Validators.required],
      academicYear: [null, Validators.required],
      cycle: [null, Validators.required],
      courseId: [null, Validators.required],
      instructorId: [this.instructorId, Validators.required]
    });
  }

  submit() {
    if(this.myClassForm.valid) {
      this.myClassActionCreator.CreateMyClass(this.programId, this.myClassForm.value);
      this.ngOnInit();
    }
  }

}
