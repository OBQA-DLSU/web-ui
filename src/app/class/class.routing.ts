import { Routes } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassListComponent } from './class-list/class-list.component';

export const ClassRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ClassListComponent
    }]},{
    path: '',
    children: [{
      path: 'add-class',
      component: AddClassComponent
  }]}
];
