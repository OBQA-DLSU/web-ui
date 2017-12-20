import { NgModule, ModuleWithProviders } from '@angular/core';

import { UserActionCreator } from './user.actioncreator';
import { SessionActionCreator } from './session.actioncreator';
import { CourseActionCreator } from './course.actioncreator';
import { MyClassActionCreator } from './my-class.actioncreator';
import { MiscActionCreator } from './misc.actioncreator';
import { SopiActionCreator } from './sopi.actioncreator';

@NgModule({
  imports: [],
  declarations: []
})
export class ActionCreatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionCreatorModule,
      providers: [
        UserActionCreator,
        SessionActionCreator,
        CourseActionCreator,
        MyClassActionCreator,
        MiscActionCreator,
        SopiActionCreator
      ]
    }
  }
}