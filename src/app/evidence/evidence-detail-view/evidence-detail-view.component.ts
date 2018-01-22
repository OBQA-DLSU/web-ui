import { Component, OnInit, Input } from '@angular/core';
import { IAssessment } from 'app/interfaces/assessment/assessment.interface';

@Component({
  selector: 'app-evidence-detail-view',
  templateUrl: './evidence-detail-view.component.html',
  styleUrls: ['./evidence-detail-view.component.scss']
})
export class EvidenceDetailViewComponent implements OnInit {

  @Input() assessment: IAssessment;

  constructor() { }

  ngOnInit() {
  }

}
