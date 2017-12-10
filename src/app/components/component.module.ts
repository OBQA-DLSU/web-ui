import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { ObqaTableComponent } from './table/obqa-table.component';
import { MaterialModule } from 'app/app.module';
import { FormComponent } from './form/form.component';
import { ObqaUploadBasicComponent } from './upload/basic/obqa-upload-basic.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule
  ],
  exports: [
    ObqaTableComponent,
    FormComponent,
    ObqaUploadBasicComponent
  ],
  declarations: [
    ObqaTableComponent,
    FormComponent,
    ObqaUploadBasicComponent,
    FileSelectDirective
  ]
})
export class ComponentModule {
}
