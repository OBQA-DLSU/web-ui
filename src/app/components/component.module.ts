import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { MaterialModule } from 'app/app.module';

import { ObqaTableComponent } from './table/obqa-table.component';
import { FormComponent } from './form/form.component';
import { ObqaUploadBasicComponent } from './upload/basic/obqa-upload-basic.component';
import { ObqaInputBasicComponent } from './input/basic/obqa-input-basic.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    ObqaTableComponent,
    FormComponent,
    ObqaUploadBasicComponent,
    ObqaInputBasicComponent
  ],
  declarations: [
    ObqaTableComponent,
    FormComponent,
    ObqaUploadBasicComponent,
    FileSelectDirective,
    ObqaInputBasicComponent
  ]
})
export class ComponentModule {
}
