import { Routes } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassPageComponent } from './class-list/class-page/class-page.component';

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
  }]},{
    path: '',
    children: [{
      path: 'class-details',
      component: ClassPageComponent
  }]},{
    path: '',
    children: [{
      path: 'class-details/:id',
      component: ClassPageComponent
  }]}
];
