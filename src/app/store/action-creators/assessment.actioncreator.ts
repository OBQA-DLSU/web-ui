import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { AssessmentService } from '../../services/assessment.service';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../app.store';
import {
  ASSESSMENT_CREATE_ATTEMPT,
  ASSESSMENT_CREATE_FAILED,
  ASSESSMENT_CREATE_FULFILLED,
  ASSESSMENT_DELETE_ATTEMPT,
  ASSESSMENT_DELETE_FAILED,
  ASSESSMENT_DELETE_FULFILLED,
  ASSESSMENT_GET_ATTEMPT,
  ASSESSMENT_GET_FAILED,
  ASSESSMENT_GET_FULFILLED,
  ASSESSMENT_UPDATE_ATTEMPT,
  ASSESSMENT_UPDATE_FAILED,
  ASSESSMENT_UPDATE_FULFILLED
} from '../action/assessment.actions';
import { IAssessmentView } from '../../interfaces/assessment/assessment-view.interface';
import { IAssessment } from '../../interfaces/assessment/assessment.interface';

@Injectable()

export class AssessmentActionCreator implements OnDestroy {

  private errorMessage: string;
  private getAssessmentSubscription: Subscription = null;
  private createAssessmentSubscription: Subscription = null;
  private getFilteredAssessmentByProgramSubscription: Subscription = null;
  private getAllAssessmentSubscription: Subscription = null;
  private getFilteredAssessmentSubscription: Subscription = null;
  private getOneAssessmentSubscription: Subscription = null;
  private updateAssessmentSubscription: Subscription = null;
  private deleteAssessmentSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private assessmentService: AssessmentService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy () {
    (this.getAssessmentSubscription) ? this.getAssessmentSubscription.unsubscribe() : null;
    (this.createAssessmentSubscription) ? this.createAssessmentSubscription.unsubscribe() : null;
    (this.getFilteredAssessmentByProgramSubscription) ? this.getFilteredAssessmentByProgramSubscription.unsubscribe() : null;
    (this.getAllAssessmentSubscription) ? this.getAllAssessmentSubscription.unsubscribe() : null;
    (this.getOneAssessmentSubscription) ? this.getOneAssessmentSubscription.unsubscribe() : null;
    (this.updateAssessmentSubscription) ? this.updateAssessmentSubscription.unsubscribe() : null;
    (this.deleteAssessmentSubscription) ? this.deleteAssessmentSubscription.unsubscribe() : null;
  }

  GetAssessment (programId: number) {
    this.getAssessmentSubscription = this.assessmentService.GetAssessment(programId)
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToView(d))
      return newData;
    })
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  CreateAssessment (programId: number, assessment: IAssessmentView) {
    this.createAssessmentSubscription = this.assessmentService.CreateAssessment(programId, assessment)
    .map(data => this.assessmentToView(data))
    .subscribe(
      (assessment: IAssessmentView) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_CREATE_FULFILLED, payload: assessment });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Assessment Creation',
          text: `You successfully Added a new Assessment.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_CREATE_FAILED, error: this.errorMessage });
          
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetFilteredAssessmentByProgram (programId: number, filterName: string, filterValue: string) {
    this.getFilteredAssessmentByProgramSubscription = this.assessmentService.GetFilteredAssessmentByProgram(programId, filterName, filterValue)
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToView(d))
      return newData;
    })
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetAllAssessment () {
    this.getAllAssessmentSubscription = this.assessmentService.GetAllAssessment()
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToView(d))
      return newData;
    })
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetFilteredAssessment (filterName: string, filterValue: string) {
    this.getFilteredAssessmentSubscription = this.assessmentService.GetFilteredAssessment(filterName, filterValue)
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToView(d))
      return newData;
    })
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetOneAssessment (id: number) {
    this.getOneAssessmentSubscription = this.assessmentService.GetOneAssessment(id)
    .map(data => this.assessmentToView(data))
    .subscribe(
      (assessment: IAssessmentView) => {
        const assessments = [assessment];
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateAssessment (id: number, assessment: IAssessmentView) {
    this.updateAssessmentSubscription = this.assessmentService.UpdateAssessment(id, assessment)
    .map(data => this.assessmentToView(data))
    .subscribe(
      (assessment: IAssessmentView) => {
        this.ngRedux.dispatch({type: ASSESSMENT_UPDATE_FULFILLED, payload: assessment});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Assessment Update',
          text: `$Assessment ID: {assessment.id} was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteAssessment (id: number) {
    this.deleteAssessmentSubscription = this.assessmentService.DeleteAssessment(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Assessment Deletion',
          text: `Assessment ID: ${id} was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  // functions
  private assessmentToView: Function = (data: IAssessment): IAssessmentView => {
    let newData: IAssessmentView;
    newData = {
      id: data.id,
      assessmentLevel: data.assessmentLevel,
      assessmentTask: data.assessmentTask,
      target: data.target,
      passingGrade: data.passingGrade,
      performance: data.performance,
      improvementPlan: data.improvementPlan,
      term: data.term,
      academicYear: data.academicYear,
      cycle: data.cycle,
      programId: data.programId,
      programSopiId: data.programSopiId,
      programCourseId: data.programCourseId,
      program: data.program.name,
      sopi: data.programSopi.sopi.code,
      course: data.programCourse.course.code,
      improvementPlanSuggestions: data.improvementPlanSuggestions
    };
    return newData;
  };

}
