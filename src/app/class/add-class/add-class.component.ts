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
  private myClassForm: FormGroup;
  private programId: number = 5;
  constructor(
    private courseActionCreator: CourseActionCreator,
    private instructorActionCreator: InstructorActionCreator,
    private myClassActionCreator: MyClassActionCreator,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.courseActionCreator.GetCourse(this.programId);
    this.instructorActionCreator.GetInstructor(this.programId);
    this.myClassForm = this.formBuilder.group({
      term: [null, Validators.required],
      academicYear: [null, Validators.required],
      cycle: [null, Validators.required],
      programCourseId: [null, Validators.required],
      instructorId: [null, Validators.required]
    });
  }

  submit() {
    console.log(this.myClassForm.value);
    if(this.myClassForm.valid) {
      this.myClassActionCreator.CreateMyClass(this.programId, this.myClassForm.value);
    }
  }

}
