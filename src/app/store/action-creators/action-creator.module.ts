import { NgModule, ModuleWithProviders } from '@angular/core';

import { UserActionCreator } from './user.actioncreator';


@NgModule({
  imports: [],
  declarations: []
})
export class ActionCreatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionCreatorModule,
      providers: [
        UserActionCreator
      ]
    }
  }
}