import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObqaTableComponent } from './table/obqa-table.component';
import { MaterialModule } from 'app/app.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ObqaTableComponent
  ],
  declarations: [ObqaTableComponent]
})
export class ComponentModule {
}
