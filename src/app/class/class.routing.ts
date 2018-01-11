import { Routes } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassPageComponent } from './class-page/class-page.component';

export const ClassRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ClassListComponent
      }, {
        path: 'add-class',
        component: AddClassComponent
      }, {
        path: 'class-details/:id',
        component: ClassPageComponent
      }
  ]}
];
