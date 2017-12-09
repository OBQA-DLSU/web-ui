import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObqaTableComponent } from './table/obqa-table.component';
import { MaterialModule } from 'app/app.module';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ObqaTableComponent, FormComponent
  ],
  declarations: [ObqaTableComponent, FormComponent]
})
export class ComponentModule {
}
