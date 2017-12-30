import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, sessionReducer as session, ISessionStore } from './session.store';
import { USER_INITIAL_STATE, userReducer as user, IUserStore } from './user.store';
import { COURSE_INITIAL_STATE, courseReducer as courses, ICourseStore } from './course.store';
import { SOPI_INITIAL_STORE, sopiReducer as sopis, ISopiStore } from './sopi.store';
import { MY_CLASS_INITIAL_STATE, myClassReducer as myClasses, IMyClassStore } from './my-class.store';
import { MISC_INITIAL_STATE, miscReducer as misc, IMiscStore } from './misc.store';
import { INVITE_INITIAL_STATE, inviteReducer as invite, IInviteStore } from './invite.store';
import { INSTRUCTOR_INITIAL_STATE, instructorReducer as instructors, IInstructorStore } from './instructor.store';
import { ASSESSMENT_INITIAL_STORE, assessmentReducer as assessments, IAssessmentStore } from './assessment.store';
import { MY_CLASS_STUDENT_INITIAL_STATE, myStudentReducer as students, IMyStudentStore } from './student.store';

export interface IAppState {
  session: ISessionStore;
  user: IUserStore;
  courses: ICourseStore;
  sopis: ISopiStore;
  myClasses: IMyClassStore;
  misc: IMiscStore;
  invite: IInviteStore;
  instructors: IInstructorStore;
  assessments: IAssessmentStore;
  students: IMyStudentStore;
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  courses: COURSE_INITIAL_STATE,
  sopis: SOPI_INITIAL_STORE,
  myClasses: MY_CLASS_INITIAL_STATE,
  misc: MISC_INITIAL_STATE,
  invite: INVITE_INITIAL_STATE,
  instructors: INSTRUCTOR_INITIAL_STATE,
  assessments: ASSESSMENT_INITIAL_STORE,
  students: MY_CLASS_STUDENT_INITIAL_STATE
}

export const rootReducer = combineReducers<IAppState>({
  session,
  user,
  courses,
  sopis,
  myClasses,
  misc,
  invite,
  instructors,
  assessments,
  students
});
