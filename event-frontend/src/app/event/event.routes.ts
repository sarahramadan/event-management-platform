import { Routes } from '@angular/router';
import { EventListComponent } from './event-list.component';
import { EventFormComponent } from './event-form.component';

export const eventRoutes: Routes = [
  {
    path: '',
    component: EventListComponent
  },
  {
    path: 'new',
    component: EventFormComponent
  },
  {
    path: ':id',
    component: EventFormComponent
  }
];
