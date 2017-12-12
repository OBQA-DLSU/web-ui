import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/app.module';

import { ObqaTableComponent } from './table/obqa-table.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ObqaTableComponent, FormComponent
  ],
  declarations: [
    ObqaTableComponent,
    FormComponent
  ]
})
export class ComponentModule {
}
