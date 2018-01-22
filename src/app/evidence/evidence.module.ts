import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { EvidenceClassViewComponent } from './evidence-class-view/evidence-class-view.component';
import { EvidenceDetailViewComponent } from './evidence-detail-view/evidence-detail-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    EvidenceClassViewComponent,
    EvidenceDetailViewComponent
  ],
  declarations: [
    EvidenceClassViewComponent,
    EvidenceDetailViewComponent
  ]
})
export class EvidenceModule { }
