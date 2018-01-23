import { Component, OnInit, Input } from '@angular/core';
import { IAssessment } from 'app/interfaces/assessment/assessment.interface';
import { IMyClassView } from 'app/interfaces/myClass/my-class-view.interface';

@Component({
  selector: 'app-evidence-detail-view',
  templateUrl: './evidence-detail-view.component.html',
  styleUrls: ['./evidence-detail-view.component.scss']
})
export class EvidenceDetailViewComponent implements OnInit {

  @Input() assessment: IAssessment;
  @Input() myClass: IMyClassView;
  constructor() { }

  private evidenceMax: any;
  private evidenceMin: any;
  private evidenceMedian: any;

  ngOnInit() {
    this.evidenceMax = {
      type: 'MAX',
      assessmentId: this.assessment.id,
      myClassId: this.myClass.id,
      programSopiId: this.assessment.programSopiId,
      programCourseId: this.myClass.programCourseId,
      programId: this.myClass.programId
    }
    this.evidenceMedian = {
      type: 'MEDIAN',
      assessmentId: this.assessment.id,
      myClassId: this.myClass.id,
      programSopiId: this.assessment.programSopiId,
      programCourseId: this.myClass.programCourseId,
      programId: this.myClass.programId
    }
    this.evidenceMin = {
      type: 'MIN',
      assessmentId: this.assessment.id,
      myClassId: this.myClass.id,
      programSopiId: this.assessment.programSopiId,
      programCourseId: this.myClass.programCourseId,
      programId: this.myClass.programId
    }
  }
}
