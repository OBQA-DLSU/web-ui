import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { InstructorActionCreator } from '../../store/action-creators/instructor.actioncreator';
import { select } from '@angular-redux/store';
import {
  MiscActionCreator,
  MyClassActionCreator,
  CourseActionCreator
} from '../../store/action-creators/index';
import { ACADEMIC_YEAR, CYCLE, TERM, WEB_API_URL } from '../../config';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styles: []
})
export class AddClassComponent implements OnInit {
  @select(s => s.courses.courses) courses;
  @select(s => s.instructors.instructors) instructors;
  @select(s => s.session) session;
  @select(s => s.myClasses.spinner) spinner;
  private programId: number;
  private isAdmin: boolean;
  private instructorId: number;
  private myClassForm: FormGroup;
  private academicYearData = ACADEMIC_YEAR;
  private termData = TERM;
  private cycleData = CYCLE;
  private uploadUrl: string;
  constructor(
    private courseActionCreator: CourseActionCreator,
    private instructorActionCreator: InstructorActionCreator,
    private myClassActionCreator: MyClassActionCreator,
    private miscActionCreator: MiscActionCreator,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Add Class');
    this.session.subscribe(
    (session => {
      this.programId = session.program.id;
      this.isAdmin = session.isAdmin;
      this.instructorId = session.user.instructors[0].id;
      this.uploadUrl = `${WEB_API_URL}/api/myClass/bulk/${session.program.id}`;
    })
    );
    this.courseActionCreator.GetCourse(this.programId);
    this.instructorActionCreator.GetInstructor(this.programId);
    this.myClassForm = this.formBuilder.group({
      term: [null, Validators.required],
      academicYear: [null, Validators.required],
      cycle: [null, Validators.required],
      programCourseId: [null, Validators.required],
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
